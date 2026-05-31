import mongoose from "mongoose";

//! wishlist  schema
//[{user:1,product:1}]

// [{user:{name,id:1}}]

const wishlistSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: [true, "product is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user is required"],
    },
  },
  { timestamps: true },
);

//! wishlist model
const Wishlist = mongoose.model("wishlist", wishlistSchema);
export default Wishlist;