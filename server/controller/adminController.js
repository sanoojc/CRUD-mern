
import jwt from 'jsonwebtoken'
import userModel from "../Model/userModel.js";

export async function validateAdminLogin(req,res){
    try{
    const{email,password}=req.body
        const admin=await userModel.findOne({email})
        if(admin){
            if(admin.admin===true){
                if(admin.password==password){
                    const token=jwt.sign(
                        {
                            admin:true,
                            id:admin._id
                        }, 
                        "myjwtsecretkey"
                    )
                    return res.cookie("adminToken", token, {
                            httpOnly: true,
                            secure: true,
                            maxAge: 1000 * 60 * 60 * 24 * 7,
                            sameSite: "none",
                        }).json({error:false})
                }else{
                    return res.json({error:true,message:"incorrect password"})
                }
            }
            else{
                return res.json({error:true,message:"incorrect email"})
            }
        }
        else{
            return res.json({error:true,message:"incorrect email"})
        }
    }
    catch(err){
       return res.json({error:true,message:err})
    }
}
export const checkAdminLoggedIn=async (req, res) => {
    try {
      const token = req.cookies.adminToken;
      if (!token) 
        return res.json({loggedIn:false, error:true, message:"no token"});
      const verifiedJWT = jwt.verify(token, "myjwtsecretkey");
      if(!verifiedJWT){
          res.json({loggedIn:false, message:"invalid token"});
      }
      return res.json({name:verifiedJWT.name, loggedIn: true});
    } catch (err) {
      res.json({loggedIn:false, error:err});
    }
}
export async function logout(req,res){
    res.cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).json({ message: "logged out", error: false });
}
export async function createUser(req,res){
    try{
        const {name,email,phone,password,confPassword}=req.body
        let user= await userModel.findOne({email})
        if (user){
           return res.json({error:true,message:"user already exists"})
        }
        if(name.trim()==''|| email.trim()==''||phone.trim()==''||password.trim()==''||confPassword.trim()==''){
           return res.json({error:true,message:"please enter all fields"})
        }
        if(password!=confPassword){
            return res.json({error:true,message:"password must be same"})
        }else{
            user= new userModel({name,email,phone,password})
            user.save()
            const token = jwt.sign(
                {
                    id: user._id
                },
                "myjwtsecretkey"
            )
            return res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: "none",
            }).json({ error: false })
        }
       }
        catch (err) {
            res.json({ error: err })
            console.log(err);
        }  
}
export async function getUsers(req,res){
    try{
        let users = await userModel.find({admin:{$ne:true}, name:new RegExp(req.query.search, 'i')}, {password:0}).lean();
        res.json(users)
    }catch(err){
        console.log(err)
    }
}
export async function deleteUser(req,res){

    try{
        const id=req.params.id
        await userModel.findByIdAndDelete(id);
        return res.json({error:false})
    }
    catch(err){
        res.json({error:true,message:"something went wrong"})
    }
}
export async function getEditUser (req,res){
    try{
        const user=await userModel.findById(req.params.id,{password:0})
        res.json(user)
    }catch(err){
        console.log(err)
    }
}

export async function editUser(req,res){

    const {id,name,email,phone}=req.body
    if(name.trim()==""||email.trim()==""||phone.trim()==""){
        return res.json({error:true,message:"please fill all fields"})
    }
    const user=await userModel.findByIdAndUpdate(id,{$set:{name,email,phone}})
    res.json({error:false,user:user})
}