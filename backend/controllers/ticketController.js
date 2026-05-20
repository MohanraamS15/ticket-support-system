const Ticket=require('../models/ticketSchema');


const getTicket=async (req,res)=>{
    const id=req.params.id;

    const ticket=await Ticket.findById(id);
    if(!ticket){
        return res.status(400).json({msg:"Resource not found"});
    }
    console.log('getTicket');
    return res.status(200).json(ticket);
    
}

const getAllTicket=async (req,res)=>{

    let {status,category,page,limit,sort}=req.query;
    let queryObj={};

    if(req.user.role==='user'){
        queryObj.createdBy=req.user.userId;
    }

    

    if(status){
        queryObj.status=status;
    }

    if(category){
        queryObj.category=category;
    }
    
    sort=sort||'title';


    page=Number(page) || 1;
    limit=Number(limit) || 10;

    const skip=(page-1)*limit;

    const totalTicket= await Ticket.countDocuments(queryObj);

    const tickets=await Ticket.find(queryObj)
            .skip(skip)
            .limit(limit)
            .sort(sort);
    
    console.log('getAllTicket');

    const totalPages=Math.ceil(totalTicket/limit);
    return res.status(200).json({
        totalPages,
        currentPage:page,
        totalTicket,
        tickets
    });
    
}

const createTicket=async (req,res)=>{
    const ticket=await Ticket.create({
        ...req.body,
        createdBy:req.user.userId
    });
    console.log('createTicket');
    return res.status(201).json(ticket);
    
}


const updateTicket=async (req,res)=>{
    const id=req.params.id;
    const ticket=await Ticket.findOneAndUpdate({_id:id},req.body,{
        returnDocument:'after',
        runValidators:true
    })

    if(!ticket){
        return res.status(400).json({msg:"Resource not found"});
    }
    console.log('updateTicket');

    return res.status(200).json(ticket);
    
}

const deleteTicket=async (req,res)=>{
    const id=req.params.id;
    const ticket=await Ticket.findByIdAndDelete({_id:id});

    if(!ticket){
        return res.status(400).json({msg:"Ticket not Found"});
    }
    console.log('deleteTicket');
    return res.status(204).send('done');
    
}


const takeTicket=async (req,res)=>{


    const ticket=await Ticket.findByIdAndUpdate(
        req.params.id,{
            claimedBy:req.user.userId,
            status:'in-progress'
        },{
            returnDocument:'after'
        }
    )

    res.status(200).json(ticket);
}


const dashboard=async (req,res)=>{

    let query={};

    if(req.user.role==='admin'){
        query={};
    }
    else if(req.user.role==='user'){
        query={
            createdBy:req.user.userId
        }
    }
    else{
        query={
            category:req.user.role
        }
    }
    const total=await Ticket.countDocuments(query);

    const open=await Ticket.countDocuments({
        ...query,
        status:'open'
    });

    const progress=await Ticket.countDocuments({
        ...query,
        status:'in-progress'
    });

    const resolved=await Ticket.countDocuments({
        ...query,
        status:'resolved'
    });

    const tickets=await Ticket.find({
        ...query
    }).sort('-createdAt');

    res.json({
        total,open,progress,resolved,tickets
    });

}


module.exports={
    createTicket,getTicket,getAllTicket,updateTicket,deleteTicket,takeTicket,dashboard
};