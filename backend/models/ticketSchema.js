const mongoose=require('mongoose');

const TicketSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'provide the title'],
        trim:true,
    },
    description:{
        type:String,
        required:[true,'provide the description'],
    },
    category:{
        type:String,
        enum:[
            'carpenter',
            'mechanical',
            'electrical',
            'plumbing',
            'other'
        ],
        required:[true,'provide the category'],
    },
    status:{
        type:String,
        enum:['open','in-progress','resolved','closed'],
        default:'open'
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'medium'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    claimedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    }

})

module.exports=mongoose.model('Ticket',TicketSchema);