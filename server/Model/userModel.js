import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    password:{
        type:String
    },
    admin:{
        type:Boolean,
        default:false
    },
    profile:{
        type:String,
        default:"avathar1.png"
    }

})
const userModel=mongoose.model("user",userSchema)
export default userModel