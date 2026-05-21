import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/category.controller";

const router = express.Router();

//? get all
router.get("/", getAll);

//? get by id
router.get("/:id", getById);

//? create
router.post("/", create);

//? update
router.put("/:id", update);

//? delete
router.delete("/:id", remove);

export default router;