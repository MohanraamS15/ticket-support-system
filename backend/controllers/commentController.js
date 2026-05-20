const Comment=require('../models/commentSchema');
const Ticket=require('../models/ticketSchema');

const createComment=async(req,res)=>{

    const ticket=await Ticket.findById(
        req.params.id
    );

    if(
        ticket.claimedBy != req.user.userId &&
        req.user.role!='admin'
    ){

        return res.status(403)
            .json({
                msg:'Access denied'
            });

    }

    const comment=await Comment.create({

        ticketId:req.params.id,

        userId:req.user.userId,

        message:req.body.message

    });

    res.status(201).json(comment);

}

const getComments=async (req,res)=>{
    const ticketId=req.params.id;
    const comments =await Comment.find({
        ticketId
    }).populate(
        'userId',
        'name role'
    )

    return res.status(200).json(comments);
}


module.exports={createComment,getComments};