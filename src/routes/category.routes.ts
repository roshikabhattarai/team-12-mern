import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/category.controller";
import { multerUploader } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { Only_Admins, Role } from "../types/enum.types";

//multer uploader
const upload = multerUploader();

const router = express.Router();

//? get all
router.get("/", getAll);

//? get by id
router.get("/:id", getById);

//? create
router.post(
  "/",
  upload.single("image"),
  //  authenticate(Only_Admins),
  create,
);

//? update
router.put("/:id", authenticate(Only_Admins), update);

//? delete
router.delete("/:id", authenticate(Only_Admins), remove);

export default router;