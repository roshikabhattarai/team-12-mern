// name: required
// description: optional

import mongoose from "mongoose";

// Category Interface
interface ICategorySchema extends Document {
  name: string;
  description?: string;
}

// Category Schema
const categorySchema = new mongoose.Schema<ICategorySchema>(
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

// Category Model
const Category = mongoose.model<ICategorySchema>(
  "Category",
  categorySchema
);

export default Category;

// brand ko garni aaja