const User=require('../models/userSchema');

const register=async(req,res)=>{

    const {name,email,password,role}=req.body;

    const user=await User.create({
        name,email,password,role
    });

    const token=user.createJWT();

    res.status(201).json({
        name,email,token,role
    })
}

const login=async (req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});

    if(!user){

        return res.status(400).json({
            msg:"provide valid credentials"
        })
    }
    const compare=await user.comparePassword(password);

    if(!compare){

        return res.status(400).json({
            msg:"provide valid credentials"
        })
    }

    const token=user.createJWT();

    res.status(200).json({
        email,token,role:user.role
    })
}

module.exports={login,register};