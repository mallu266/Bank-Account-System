import { AccountModel } from '../models/Accounts.js';
import type { NextFunction } from 'express';

export class AccountService {
  async createAccount(data: any, next: NextFunction) {
    const prefix = 'ACC';
    const timestamp = Date.now(); // current time in ms
    const random = Math.floor(10 + Math.random() * 90); // 4-digit random
    const uniqueAccountNumber = `${prefix}${timestamp}${random}`;
    const newAccount = {
      ...data,
      accountNumber: uniqueAccountNumber,
    };
    const account = await AccountModel.create(newAccount);
    return account;
  }
}
