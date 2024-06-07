import { Router } from "express";
import { authMiddleware } from "./middleware/auth";
import { AuthController } from "./controller/auth";

const router = Router();

// auth
const auth = new AuthController();
router.get("/auth/init", authMiddleware, auth.init);

export default router;