import express,{Request, Response} from "express";
import userRoutes from "./routes/user.routes";

const app = express();



app.use(express.json({limit:"10mb"})
   
);

// middleware

// ! helth route 

app.use("/", (req:Request,res:Response)=>{
    res.status(200).json({
        message: "Server is up and running",
        success: true,
        status: "success",
    })
})
// !using routes

app.use("/api/v1/users",userRoutes);

export default app;