import  express from "express"
import { register } from "../controllers/auth.controller";

const router = express.Router();
// ! create acc
router.post("/register", register);

export default router;