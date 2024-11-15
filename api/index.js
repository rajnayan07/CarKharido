import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';//we cannto use .env in backend directally
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

const __dirname=path.resolve()
console.log(__dirname);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'client', 'dist', 'index.html'));
});

dotenv.config()//user.model';

const app=express();
app.use(cors());



mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
})

app.use(express.json());

app.use(cookieParser());

app.listen(2000,()=>{
    console.log("server is runnig on port :2000");
})


app.use("/api/user",userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing', listingRouter);


app.use((err,req,res,next)=>{
     const statuscode=err.statuscode||500;
     const message=err.message||"internal errror";
     return res.status(statuscode).json({
        success:false,
        statuscode,
        message
     })
})
