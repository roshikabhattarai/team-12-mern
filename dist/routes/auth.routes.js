"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const multer_middleware_1 = require("../middlewares/multer.middleware");
// import { login} from "../controllers/user.controller";
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.multerUploader)();
// ! create acc
router.post("/register", upload.single("profile_image"), auth_controller_1.register);
// !login user
router.post("/login", auth_controller_1.login);
// change profile image
router.put("/chane-profile-image/:id", upload.single("profile_image"), auth_controller_1.changeProfilePicture);
exports.default = router;
