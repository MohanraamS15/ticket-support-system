const jwt=require('jsonwebtoken');
require('dotenv').config();

const auth=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        console.log('hello')
        return res.status(401).json({msg:"Provide authentication"});
    }

    const token=authHeader.split(' ')[1];

    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET);

        req.user={
            userId:payload.userId,
            name:payload.name,
            role:payload.role
        }
        next();
    }
    catch(err){
        return res.status(401).json({msg:'Unauthorized'});
    }
}

module.exports=auth;