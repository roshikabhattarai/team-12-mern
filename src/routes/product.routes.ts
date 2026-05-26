import express from "express";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getFeaturedProducts,
  getNewArrivals,
} from "../controllers/product.controller";

const router = express.Router();

//* get all products
router.get("/", getAllProducts);

//* get featured products
router.get("/featured", getFeaturedProducts);

//* get new arrivals
router.get("/new-arrivals", getNewArrivals);

//* get products by category
router.get("/category/:category", getProductsByCategory);

//* get product by id
router.get("/:id", getProductById);

//* create product
router.post("/", createProduct);

//* update product
router.patch("/:id", updateProduct);

//* delete product
router.delete("/:id", deleteProduct);

export default router;