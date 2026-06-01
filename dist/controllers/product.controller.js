"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewProducts = exports.getFeaturedProducts = exports.getByCategory = exports.remove = exports.create = exports.getById = exports.getAll = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const product_model_1 = __importDefault(require("../models/product.model"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const category_model_1 = __importDefault(require("../models/category.model"));
const brand_model_1 = __importDefault(require("../models/brand.model"));
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const pagination_utils_1 = require("../utils/pagination.utils");
const folder = "/products";
//* get all products
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { query, category, brand, minPrice, maxPrice, limit = "10", page = "1", } = req.query;
    const filter = {};
    const perPage = Number(limit); // 10
    const currPage = Number(page); // 1
    const skip = (currPage - 1) * perPage;
    // c_page: 1 , skip: 0 , 1-10
    // 2 , 10 , 11-20
    // 3 , 20 , 21-20
    if (query) {
        filter.$or = [
            {
                name: {
                    $regex: query,
                    $options: "i",
                },
            },
            {
                description: {
                    $regex: query,
                    $options: "i",
                },
            },
        ];
    }
    if (category) {
        filter.category = category;
    }
    if (brand) {
        filter.brand = brand;
    }
    //! price filter
    if (minPrice || maxPrice) {
        if (minPrice) {
            filter.price = {
                $gte: Number(minPrice),
            };
        }
        if (maxPrice) {
            filter.price = {
                $lte: Number(maxPrice),
            };
        }
    }
    const products = await product_model_1.default.find(filter).skip(skip).limit(perPage);
    const count = await product_model_1.default.countDocuments(filter);
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Products fetched",
        statusCode: 200,
        data: products,
        meta: (0, pagination_utils_1.getPagination)(count, perPage, currPage),
    });
});
//* get by id
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const product = await product_model_1.default.findOne({ _id: id });
    if (!product) {
        throw new appError_utils_1.default(`product ${id} not found `, 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `Product ${id} fetched`,
        statusCode: 200,
        data: product,
    });
});
//* create
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    console.log(req.body);
    const { name, description, price, stock, category, brand, new_arrival, featured, } = req.body;
    //! files
    const { cover_image, images } = req.files;
    if (!name || !price || !stock) {
        throw new appError_utils_1.default("name, price & stock are required", 400);
    }
    if (!category) {
        throw new appError_utils_1.default("category required", 400);
    }
    if (!brand) {
        throw new appError_utils_1.default("brand required", 400);
    }
    if (!cover_image[0]) {
        throw new appError_utils_1.default("cover_image is required", 400);
    }
    const product = new product_model_1.default({
        name,
        stock,
        price,
        description,
        new_arrival,
        featured,
    });
    const p_category = await category_model_1.default.findOne({ _id: category });
    if (!p_category) {
        throw new appError_utils_1.default("Category not found", 400);
    }
    const p_brand = await brand_model_1.default.findOne({ _id: brand });
    if (!p_brand) {
        throw new appError_utils_1.default("Brand not found", 400);
    }
    product.category = p_category._id;
    product.brand = p_brand._id;
    //todo images
    //* cover image
    const { path, public_id } = await (0, cloudinary_utils_1.sendFileToCloudinary)(cover_image[0], folder);
    product.cover_image = {
        path,
        public_id,
    };
    // * images
    if (images && Array.isArray(images) && images.length > 0) {
        const promises = images.map(async (file) => await (0, cloudinary_utils_1.sendFileToCloudinary)(file, folder));
        const files = await Promise.all(promises);
        product.images = files;
    }
    //! save product
    await product.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `Product ${product._id} created`,
        statusCode: 201,
        data: product,
    });
});
//* update
//* remove
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const product = await product_model_1.default.findOne({ _id: id });
    if (!product) {
        throw new appError_utils_1.default("Product not found", 404);
    }
    await (0, cloudinary_utils_1.deleteFileFromCloudinary)(product.cover_image.public_id);
    if (product.images && product.images.length > 0) {
        const promises = product.images.map(async (img) => await (0, cloudinary_utils_1.deleteFileFromCloudinary)(img.public_id));
        await Promise.all(promises);
    }
    //! delete product
    await product.deleteOne();
    //! send success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `product ${product._id} deleted`,
        statusCode: 200,
        data: null,
    });
});
//* get by category
exports.getByCategory = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { categoryId } = req.params;
    const products = await product_model_1.default.find({ category: categoryId });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `Product by category ${categoryId} fetched`,
        statusCode: 200,
        data: products,
    });
});
//* get all featured products
exports.getFeaturedProducts = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const products = await product_model_1.default.find({ featured: true });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `All featured Products fetched`,
        statusCode: 200,
        data: products,
    });
});
//* get all new arrivals
exports.getNewProducts = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const products = await product_model_1.default.find({ new_arrival: true });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `All new arrivals  fetched`,
        statusCode: 200,
        data: products,
    });
});
