"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        minLength: [25, "atleat 25 char. required"],
    },
    price: {
        type: String,
        required: [true, "price is required"],
    },
    stock: {
        type: Number,
        required: [true, "stock is required"],
    },
    cover_image: {
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
        required: [true, "cover_image is required"],
    },
    images: [
        {
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
        },
    ],
    //! category : 6a0afd1dc56c20e218d7fcde  / {}
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "category is required"],
        ref: "category",
    },
    //! brand
    brand: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "brand is required"],
        ref: "brand",
    },
    new_arrival: {
        type: Boolean,
        default: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
//! model
const Product = mongoose_1.default.model("product", productSchema);
exports.default = Product;
