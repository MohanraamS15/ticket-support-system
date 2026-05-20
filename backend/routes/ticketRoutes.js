const express=require('express');

const router=express.Router();

const auth=require('../middleware/authenticationMiddleware');
const authorize=require('../middleware/authorizeMiddleware');
const {createTicket,getTicket,getAllTicket,updateTicket,
    dashboard,myTickets,deleteTicket,takeTicket}=require('../controllers/ticketController')

router.route('/')
    .get(auth,getAllTicket)
    .post(auth,createTicket);


router.route('/:id')
    .get(auth,getTicket)
    .put(auth,authorize( 
            'admin',
            'carpenter',
            'electrical',
            'mechanical',
            'plumbing'),updateTicket)
    
    .delete(auth,authorize('admin'),deleteTicket);

router.route('/take/:id').patch(auth,authorize,takeTicket);

router.route('/dashboard',auth,dashboard);

module.exports=router;

