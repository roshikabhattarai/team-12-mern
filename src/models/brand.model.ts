import mongoose  from "mongoose";

// Brand Interface
export interface IBrand extends Document {
  name: string;
  description?: string;
}

// Brand Schema
const brandSchema = new mongoose.Schema<IBrand>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Brand Model
const Brand = mongoose.model<IBrand>(
  "Brand",
  brandSchema
);

export default Brand;