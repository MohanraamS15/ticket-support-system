require('dotenv').config()
const express=require('express');

const app=express();

const errorHandler=require('./middleware/errorMiddleware');
const notFound=require('./middleware/notFoundMiddleware');

const ticketRoute=require('./routes/ticketRoutes');
const authRoute=require('./routes/authRoutes');
const commentRoute=require('./routes/commentRoutes');

const mongoDB=require('mongoose');
app.use(express.json());

app.use('/',authRoute);
app.use('/ticket',ticketRoute);
app.use('/comment',commentRoute);


app.use(errorHandler);
app.use(notFound);

const start=async ()=>{
    await mongoDB.connect(process.env.MONGO_URI);
    app.listen(5000,()=>{
        console.log('hi');
    })
}

start();


