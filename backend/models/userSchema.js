const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
require('dotenv').config();

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'provide the User name'],
    },
    email:{
        type:String,
        required:[true,'provide the email'],
        unique:[true,'email already exist']
    },
    password:{
        type:String,
        required:[true,'provide the password']
    },
    role:{
        type:String,
        enum:[
            'user',
            'admin',
            'carpenter',
            'electrical',
            'mechanical',
            'plumbing',
            'it-support'
        ],
        default:'user'

    }

},{
    timestamps:true
})


userSchema.pre('save',async function(){

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})

userSchema.methods.createJWT=function(){
    return jwt.sign({
        userId:this._id,
        name:this.name,
        role:this.role
    },
        process.env.JWT_SECRET
    ,{
        expiresIn:'10d'
    })
}

userSchema.methods.comparePassword=async function(comparepassword){
    const isCorrect=await bcrypt.compare(this.password,comparepassword);
    return isCorrect;
}
module.exports=mongoose.model('User',userSchema);