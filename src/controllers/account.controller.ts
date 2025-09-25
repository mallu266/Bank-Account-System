import type { NextFunction, Request, Response } from 'express';
import { AccountService } from '../services/AccountService';
import { AccountFactory } from '../utilities/account-factory';
import type BankAccount from '../abstractions/bank-account';

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

  async depositAmount(req: Request, res: Response, next: NextFunction) {
    const userId = req?.user?.userId;
    const { accountNumber, amount } = req.body;
    const accountInfo = await this.accountService.getAccountDetails(userId, accountNumber);
    if (!accountInfo) {
      return next(new Error('Account not found'));
    }
    const account: BankAccount= AccountFactory.createAccount(accountInfo);
    const result = await account.deposit(amount);
    res.json(result);
  }

  async getAccountDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { accountNumber } = req.query;
      const userId = req?.user?.userId;
      const accountInfo = await this.accountService.getAccountDetails(
        userId,
        accountNumber! as string,
      );
      res.json(accountInfo);
    } catch (error: any) {
      return next(error);
    }
  }

  async withdrawAmount(req: Request, res: Response, next: NextFunction) {
    const userId = req?.user?.userId;
    const { accountNumber, amount } = req.body;
    const accountInfo = await this.accountService.getAccountDetails(userId, accountNumber);
    if (!accountInfo) {
      return next(new Error('Account not found'));
    }
    const account: BankAccount = AccountFactory.createAccount(accountInfo);
    const result = await account.withdraw(amount);
    res.json(result);
  }
}