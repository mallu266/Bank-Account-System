import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
const router = Router();
const authController = new AuthController();
router.post("/sign-up", (req, res) => authController.register(req, res));
router.post("/sign-in", (req, res) => authController.login(req, res));
export default router;
