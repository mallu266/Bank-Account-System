import type { NextFunction, Request, Response } from 'express';
import { AccountService } from '../services/AccountService';

export class AccountController {
  private readonly accountService = new AccountService();
  async createAccount(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    try {
      const user = await this.accountService.createAccount(body, next);
      res.json(user);
    } catch (error: any) {
      return next(error);
    }
  }
}