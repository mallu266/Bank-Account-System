import type { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";
import JwtService from "../services/JwtService.js";

export class AuthController {
  private readonly authService = new AuthService();
  async login(req: Request, res: Response) {
    const body = req.body;
    const user = await this.authService.login(body.email, body.password);
    if (!user) throw new Error("Invalid credentials");
    const jwtPayload = { userId: user._id, name: user.name, email: user.email };
    const token = await JwtService.generateToken(jwtPayload);
    res.json({ token });
  }

  async register(req: Request, res: Response) {
    const body = req.body;
    const user = await this.authService.register(body);
    res.json({ user });
  }
}
