import express from "express";
import { login, register } from "../controllers/auth.controller";
// import { login} from "../controllers/user.controller";

const router = express.Router();


// ! create acc
router.post("/register", register);

// !login user
router.post("/login", login);

export default router;
