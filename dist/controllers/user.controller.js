"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.getAll = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
// get all users
const getAll = async (req, res, next) => {
    try {
        const filter = {};
        // get all user query (database ma garni)
        const user = await user_model_1.default.find(filter);
        // * success respone
        res.status(200).json({
            message: " All users are fetched",
            status: "success",
            success: true,
            data: user,
        });
    }
    catch (error) {
        next({
            message: error?.message || " Something went wrong",
            status: "error",
            success: false,
            data: null,
            statusCode: error?.statusCode || 500,
        });
    }
};
exports.getAll = getAll;
// !get by id
const getById = async (req, res, next) => {
    try {
        //  user id 
        const { id } = req.params;
        // db query
        const user = await user_model_1.default.findOne({ _id: id });
        // user not found
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 400;
            error.status = "fail";
            throw error;
        }
        // success respone
        res.status(200).json({
            message: ` Users ${id}  fetched`,
            status: "success",
            success: true,
            data: user,
        });
    }
    catch (error) {
        next({
            message: error?.message || " Something went wrong",
            status: "success",
            success: false,
            data: null,
            statusCode: error?.statusCode || 500,
        });
    }
};
exports.getById = getById;
