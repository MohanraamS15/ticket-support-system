const mongoose=require('mongoose');

const TicketSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true
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
        required:true
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
    }

})

module.exports=mongoose.model('Ticket',TicketSchema);