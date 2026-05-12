import mongoose from "mongoose";

const connectDatabase = (DB_URI:string)=> {;
mongoose
.connect(DB_URI)
.then(()=>{
    console.log("Database Connected");
})
.catch((error)=>{
    console.log("-------Database connetcion error-------");
    console.log(error);
});
};



export default connectDatabase;