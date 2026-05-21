import { Request, Response } from "express";
import Brand from "../models/brand.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import sendResponse from "../utils/sendResponse";

// get all
export const getAll = catchAsync(async (req: Request, res: Response) => {
  const brands = await Brand.find();

  sendResponse(res, {
    message: "All brands fetched",
    data: brands,
    statusCode: 200,
  });
});

// get by id
export const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);

  if (!brand) {
    throw new AppError(`brand ${id} not found`, 404);
  }

  sendResponse(res, {
    message: `brand ${id} fetched`,
    data: brand,
    statusCode: 200,
  });
});

// create
export const create = catchAsync(async (req: Request, res: Response) => {
  const { name, description } = req.body;

  if (!name) {
    throw new AppError("name is required", 400);
  }

  const brand = await Brand.create({
    name,
    description,
  });

  sendResponse(res, {
    message: "brand created",
    data: brand,
    statusCode: 201,
  });
});

// update
export const update = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const brand = await Brand.findById(id);

  if (!brand) {
    throw new AppError(`brand ${id} not found`, 404);
  }

  if (name) brand.name = name;
  if (description) brand.description = description;

  await brand.save();

  sendResponse(res, {
    message: `brand ${id} updated`,
    data: brand,
    statusCode: 200,
  });
});

// delete
export const remove = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);

  if (!brand) {
    throw new AppError(`brand ${id} not found`, 404);
  }

  await brand.deleteOne();

  sendResponse(res, {
    message: `brand ${id} deleted`,
    data: brand,
    statusCode: 200,
  });
});

// export default catchAsync;
// export default AppError;
// export default sendResponse;