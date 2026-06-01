"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const brand_model_1 = __importDefault(require("../models/brand.model"));
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
//! cloudinary folder to upload logo
const folder = "/brands";
//! get all
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const filter = {};
    const brands = await brand_model_1.default.find(filter);
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "brands fetched",
        data: brands,
        statusCode: 200,
    });
});
//! get by id
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const brand = await brand_model_1.default.findOne({ _id: id });
    if (!brand) {
        throw new appError_utils_1.default(`brand ${id} not found`, 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `brand ${id} fetched`,
        data: brand,
        statusCode: 200,
    });
});
//! create
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { name, description } = req.body;
    const logo = req.file;
    if (!name) {
        throw new appError_utils_1.default("name is required", 400);
    }
    if (!logo) {
        throw new appError_utils_1.default("logo is required", 400);
    }
    const brand = new brand_model_1.default({ name, description });
    //! upload logo to cloud
    const { path, public_id } = await (0, cloudinary_utils_1.sendFileToCloudinary)(logo, folder);
    //! assign logo to brand
    brand.logo = {
        path,
        public_id,
    };
    //! save brand
    await brand.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "brand created",
        data: brand,
        statusCode: 201,
    });
});
//! update
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { name, description } = req.body;
    const logo = req.file;
    const { id } = req.params;
    const brand = await brand_model_1.default.findOne({ _id: id });
    if (!brand) {
        throw new appError_utils_1.default(`brand ${id} not found`, 404);
    }
    if (name)
        brand.name = name;
    if (description)
        brand.description = description;
    if (logo) {
        const { path, public_id } = await (0, cloudinary_utils_1.sendFileToCloudinary)(logo, folder);
        await (0, cloudinary_utils_1.deleteFileFromCloudinary)(brand.logo.public_id);
        brand.logo = {
            public_id,
            path,
        };
    }
    //* save updated brand to database
    await brand.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `brand ${id} updated`,
        data: brand,
        statusCode: 200,
    });
});
//! delete
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const brand = await brand_model_1.default.findOne({ _id: id });
    if (!brand) {
        throw new appError_utils_1.default(`brand ${id} not found`, 404);
    }
    await (0, cloudinary_utils_1.deleteFileFromCloudinary)(brand.logo.public_id);
    await brand.deleteOne();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `brand ${id} deleted`,
        data: null,
        statusCode: 200,
    });
});
