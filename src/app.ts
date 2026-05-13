import express,{Request, Response} from "express";
import userRoutes from "./routes/user.routes";
import {errorHandler} from "express"
const app = express();



app.use(express.json({limit:"10mb"})
   
);

// middleware

// ! helth route 

app.get("/", (req:Request,res:Response)=>{
    res.status(200).json({
        message: "Server is up and running",
        success: true,
        status: "success",
    })
})
// !using routes

app.use("/api/v1/users",userRoutes);
app.use(error);

export default app;