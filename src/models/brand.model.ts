import mongoose, { Document } from "mongoose";

// name:req , description:op

interface IBrandSchema extends Document {
  name: string;
  description?: string;
  logo: {
    path: string;
    public_id: string;
  };
}

//? brand schema
const brandSchema = new mongoose.Schema<IBrandSchema>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      minLength: [25, "minimum 25 char. is required"],
    },
    //todo: image
    logo: {
      type: {
        path: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
      required: [true, "image is required"],
    },
  },
  { timestamps: true },
);

//? model
const Brand = mongoose.model("brand", brandSchema);
export default Brand;