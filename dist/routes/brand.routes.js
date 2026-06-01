"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brand_controller_1 = require("../controllers/brand.controller");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enum_types_1 = require("../types/enum.types");
//multer uploader
const upload = (0, multer_middleware_1.multerUploader)();
const router = express_1.default.Router();
//? get all
router.get("/", brand_controller_1.getAll);
//? get by id
router.get("/:id", brand_controller_1.getById);
//? create
router.post("/", upload.single("logo"), 
//  authenticate(Only_Admins),
brand_controller_1.create);
//? update
router.put("/:id", (0, auth_middleware_1.authenticate)(enum_types_1.Only_Admins), brand_controller_1.update);
//? delete
router.delete("/:id", (0, auth_middleware_1.authenticate)(enum_types_1.Only_Admins), brand_controller_1.remove);
exports.default = router;
