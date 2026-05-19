require('dotenv').config()
const express=require('express');

const app=express();

const ticketRoute=require('./routes/ticketRoutes');
const authRoute=require('./routes/authRoutes');

const mongoDB=require('mongoose');
app.use(express.json());

app.use('/',authRoute);
app.use('/ticket',ticketRoute);


const start=async ()=>{
    await mongoDB.connect(process.env.MONGO_URI);
    app.listen(5000,()=>{
        console.log('hi');
    })
}

start();


