const express=require('express');

const router=express.Router();

const auth=require('../middleware/authenticationMiddleware');
const {createComment,getComments}=require('../controllers/commentController');

router.post('/:id/comment')
    .post(auth,authorize(
            'admin',
            'carpenter',
            'electrical',
            'mechanical',
            'plumbing',
            'it-support'
        ),createComment)
    .get(auth,getComments);


module.exports=router;