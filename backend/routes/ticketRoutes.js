const express=require('express');

const router=express.Router();

const {createTicket,getTicket,getAllTicket,updateTicket,deleteTicket}=require('../controllers/ticketController')

router.route('/').get(getAllTicket).post(createTicket);
router.route('/:id').get(getTicket).put(updateTicket).delete(deleteTicket);

module.exports=router;

