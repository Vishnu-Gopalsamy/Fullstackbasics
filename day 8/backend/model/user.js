import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:String,
    age:Number
})

const User=mongoose.model('users',userSchema)
export default User