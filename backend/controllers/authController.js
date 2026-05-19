const User=require('../models/userSchema');

const register=async(req,res)=>{

    const {name,email,password}=req.body;

    const user=await User.create({
        name,email,password
    });

    const token=user.createJWT();
    console.log(token);

    res.status(201).json({
        name,email,token
    })
    res.send('register');
}

const login=async (req,res)=>{
    const {email,password}=req.body;

    const user=User.findOne({email});

    if(!user){
        res.status(400).json({
            msg:"provide valid credentials"
        })
    }
    const compare=await user.comparePassword(user.password);

    if(!compare){
        res.status(400).json({
            msg:"provide valid credentials"
        })
    }

    const token=user.createJWT();

    res.status(200).json({
        name,email,token
    })
    res.send('login');
}

module.exports={login,register};