import userModel from "../Model/userModel.js"
import jwt from 'jsonwebtoken'

export async function login(req,res){
    const {email,password}=req.body
    console.log(req.body)
    const user= await userModel.findOne({email})
    if(user){
        if(user.admin===true){
            return res.json({error:true,message:"admin cannot login in user side"})
        }
        if(user.password==password){

            const token = jwt.sign(
                {
                    id: user._id
                },
                "myjwtsecretkey"
            )
            console.log(token)
            // const exp= new Date()+ 1000*60;
            return res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
                sameSite: "none",
            }).json({ error: false, user: user._id })
        }
        else{
            return res.json({error:true,message:'incorrect password'})
        }
    }else{
        if( email.trim()==''||password.trim()==''){
            return res.json({error:true,message:'please enter all fields'})
        }
        return res.json({error:true,message:'user not found'})
    }

}
export async function signup(req,res){
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

export async function validateUser(req,res){
    try {
        const token = req.cookies.token;
        if (!token)
            return res.json({ loggedIn: false, error: true, message: "no token" });

        const verifiedJWT = jwt.verify(token, "myjwtsecretkey");
        const user = await userModel.findById(verifiedJWT.id, { password: 0 });
        if (!user) {
            return res.json({ loggedIn: false });
        }
        return res.json({ user, loggedIn: true });
    } catch (err) {
        console.log(err)
        res.json({ loggedIn: false, error: err });
    }
}
export async function editUserProfile(req,res){
   
    const id=req.params.id
    console.log(id)
    const user=await userModel.findById(id).lean()
    res.json({error:false,user:user})
  
}
export async function postEditUser(req,res){
    try{
    const{id,name,email,phone}=req.body
    const { filename: profile } = req.file
    console.log(req.file)
    if(name.trim()==''||email.trim()==''||phone.trim()==''){
        return res.json({error:true,message:"fields cannot be empty"})
    }
    if(profile){
        const user=await userModel.findByIdAndUpdate(id,{$set:{name,email,phone,profile}})
        return res.json({error:false,user:user})
    }
    else{

        const user=await userModel.findByIdAndUpdate(id,{$set:{name,email,phone}})
    
        res.json({error:false,user:user})
    }
}
catch(err){
    console.log(err)
}
 


}
export async function editProfile(req,res){
        try {
            await userModel.findByIdAndUpdate(req.user._id, {
                $set: {
                    profile: req.file.filename
                }
            })
            return res.json({ error: false })
        }catch(err){
            res.json({error:true, message:"Something went wrong"});
        }
}
export async function logout(req,res){
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).json({ message: "logged out", error: false });
}