import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        require: [true, "full name is required"],
        minLength: [3,"Name must be 3 char. long"],
        trim: true,
    },
    email:{
       type: String,
        require: [true, "email is required"],
        minLength: [3,"user already exit with provided email"],
        trim: true, 
    },
    password:{
        type: String,
        require: [true, "password is required"],
        minLength: [3,"password must be 6 char. long"],

    }, 
    phone:{
        type: String,
    },

    // role enum()
    role:{

        type: String,
        enum: ["ADMIN", "USER", "SUPER_ADMIN"],
        default:"USER",
    }
},
    { timestamps: true},
);

// !model
const User = mongoose.model("user",userSchema);
export default User;