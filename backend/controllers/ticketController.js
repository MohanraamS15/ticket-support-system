const Ticket=require('../models/ticketSchema');


const getTicket=async (req,res)=>{
    const id=req.params.id;

    const ticket=await Ticket.findbyId(id);
    if(!ticket){
        return res.status(400).json({msg:"Resource not found"});
    }
    console.log('getTicket');
    return res.status(200).json(ticket);
    
}

const getAllTicket=async (req,res)=>{

    let {status,category,page,limit,sort}=req.query;
    const queryObj={};

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
    const ticket=await Ticket.create(req.body);
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

module.exports={
    createTicket,getTicket,getAllTicket,updateTicket,deleteTicket
};