import { NextFunction, Request, Response } from "express";
import Brand from "../models/brand.model";
import { catchAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import AppError from "../utils/appError.utils";
import {
  deleteFileFromCloudinary,
  sendFileToCloudinary,
} from "../utils/cloudinary.utils";

//! cloudinary folder to upload logo
const folder = "/brands";

//! get all
export const getAll = catchAsync(async (req: Request, res: Response) => {
  const filter = {};

  const brands = await Brand.find(filter);

  sendResponse(res, {
    message: "brands fetched",
    data: brands,
    statusCode: 200,
  });
});

//! get by id
export const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const brand = await Brand.findOne({ _id: id });

  if (!brand) {
    throw new AppError(`brand ${id} not found`, 404);
  }

  sendResponse(res, {
    message: `brand ${id} fetched`,
    data: brand,
    statusCode: 200,
  });
});

//! create
export const create = catchAsync(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const logo = req.file as Express.Multer.File;

  if (!name) {
    throw new AppError("name is required", 400);
  }

  if (!logo) {
    throw new AppError("logo is required", 400);
  }

  const brand = new Brand({ name, description });

  //! upload logo to cloud
  const { path, public_id } = await sendFileToCloudinary(logo, folder);

  //! assign logo to brand
  brand.logo = {
    path,
    public_id,
  };

  //! save brand
  await brand.save();

  sendResponse(res, {
    message: "brand created",
    data: brand,
    statusCode: 201,
  });
});

//! update
export const update = catchAsync(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const logo = req.file as Express.Multer.File;

  const { id } = req.params;

  const brand = await Brand.findOne({ _id: id });

  if (!brand) {
    throw new AppError(`brand ${id} not found`, 404);
  }

  if (name) brand.name = name;
  if (description) brand.description = description;

  if (logo) {
    const { path, public_id } = await sendFileToCloudinary(logo, folder);
    await deleteFileFromCloudinary(brand.logo.public_id);
    brand.logo = {
      public_id,
      path,
    };
  }

  //* save updated brand to database
  await brand.save();

  sendResponse(res, {
    message: `brand ${id} updated`,
    data: brand,
    statusCode: 200,
  });
});

//! delete
export const remove = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const brand = await Brand.findOne({ _id: id });

  if (!brand) {
    throw new AppError(`brand ${id} not found`, 404);
  }

  await deleteFileFromCloudinary(brand.logo.public_id);

  await brand.deleteOne();

  sendResponse(res, {
    message: `brand ${id} deleted`,
    data: null,
    statusCode: 200,
  });
});