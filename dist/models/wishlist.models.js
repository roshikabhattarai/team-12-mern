"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//! wishlist  schema
//[{user:1,product:1}]
// [{user:{name,id:1}}]
const wishlistSchema = new mongoose_1.default.Schema({
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "product",
        required: [true, "product is required"],
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user is required"],
    },
}, { timestamps: true });
//! wishlist model
const Wishlist = mongoose_1.default.model("wishlist", wishlistSchema);
exports.default = Wishlist;
