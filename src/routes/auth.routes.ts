import express from "express";
import { login, register } from "../controllers/auth.controller";
import { multerUploader } from "../middlewares/multer.middleware";
// import { login} from "../controllers/user.controller";


const router = express.Router();

const upload = multerUploader();

// ! create acc
router.post("/register", upload.single("profile_image"), register);

// !login user
router.post("/login", login);

export default router;
