import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Product from "../models/product.model";
import { sendResponse } from "../utils/sendResponse.utils";
import AppError from "../utils/appError.utils";
import Category from "../models/category.model";
import Brand from "../models/brand.model";
import {
  deleteFileFromCloudinary,
  sendFileToCloudinary,
} from "../utils/cloudinary.utils";
import mongoose from "mongoose";
import { getPagination } from "../utils/pagination.utils";

const folder = "/products";

//* get all products
export const getAll = catchAsync(async (req: Request, res: Response) => {
  const {
    query,
    category,
    brand,
    minPrice,
    maxPrice,
    limit = "10",
    page = "1",
  } = req.query;
  const filter: mongoose.QueryFilter<any> = {};
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

  const products = await Product.find(filter).skip(skip).limit(perPage);
  const count = await Product.countDocuments(filter);

  sendResponse(res, {
    message: "Products fetched",
    statusCode: 200,
    data: products,
    meta: getPagination(count, perPage, currPage),
  });
});
//* get by id
export const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });

  if (!product) {
    throw new AppError(`product ${id} not found `, 404);
  }

  sendResponse(res, {
    message: `Product ${id} fetched`,
    statusCode: 200,
    data: product,
  });
});

//* create
export const create = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const {
    name,
    description,
    price,
    stock,
    category,
    brand,
    new_arrival,
    featured,
  } = req.body;

  //! files
  const { cover_image, images } = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  if (!name || !price || !stock) {
    throw new AppError("name, price & stock are required", 400);
  }

  if (!category) {
    throw new AppError("category required", 400);
  }
  if (!brand) {
    throw new AppError("brand required", 400);
  }

  if (!cover_image[0]) {
    throw new AppError("cover_image is required", 400);
  }
  const product = new Product({
    name,
    stock,
    price,
    description,
    new_arrival,
    featured,
  });

  const p_category = await Category.findOne({ _id: category });
  if (!p_category) {
    throw new AppError("Category not found", 400);
  }
  const p_brand = await Brand.findOne({ _id: brand });
  if (!p_brand) {
    throw new AppError("Brand not found", 400);
  }
  product.category = p_category._id;
  product.brand = p_brand._id;
  //todo images
  //* cover image
  const { path, public_id } = await sendFileToCloudinary(
    cover_image[0],
    folder,
  );
  product.cover_image = {
    path,
    public_id,
  };

  // * images
  if (images && Array.isArray(images) && images.length > 0) {
    const promises = images.map(
      async (file) => await sendFileToCloudinary(file, folder),
    );

    const files = await Promise.all(promises);
    product.images = files as any;
  }

  //! save product
  await product.save();

  sendResponse(res, {
    message: `Product ${product._id} created`,
    statusCode: 201,
    data: product,
  });
});

//* update
//* remove
export const remove = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  await deleteFileFromCloudinary(product.cover_image.public_id);

  if (product.images && product.images.length > 0) {
    const promises = product.images.map(
      async (img: any) => await deleteFileFromCloudinary(img.public_id),
    );

    await Promise.all(promises);
  }

  //! delete product
  await product.deleteOne();

  //! send success response
  sendResponse(res, {
    message: `product ${product._id} deleted`,
    statusCode: 200,
    data: null,
  });
});

//* get by category
export const getByCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const products = await Product.find({ category: categoryId });

  sendResponse(res, {
    message: `Product by category ${categoryId} fetched`,
    statusCode: 200,
    data: products,
  });
});
//* get all featured products
export const getFeaturedProducts = catchAsync(
  async (req: Request, res: Response) => {
    const products = await Product.find({ featured: true });

    sendResponse(res, {
      message: `All featured Products fetched`,
      statusCode: 200,
      data: products,
    });
  },
);

//* get all new arrivals
export const getNewProducts = catchAsync(
  async (req: Request, res: Response) => {
    const products = await Product.find({ new_arrival: true });

    sendResponse(res, {
      message: `All new arrivals  fetched`,
      statusCode: 200,
      data: products,
    });
  },
);