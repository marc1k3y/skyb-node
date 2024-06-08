import { Router } from "express";
import { authMiddleware } from "./middleware/auth";
import { AuthController } from "./controller/auth";
import { GameController } from "./controller/game";

const router = Router();

// auth
const auth = new AuthController();
router.get("/auth/init", authMiddleware, auth.init);

// game
const game = new GameController();
router.get("/game/sync", authMiddleware, game.sync);

export default router;