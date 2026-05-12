import express from "express";

const app = express();



app.use(express.json({limit:"10mb"})
   
);

// middleware

// 


export default app;