import { AccountHistoryModel } from '../models/AccountTransaction.js';
import { AccountModel } from '../models/Accounts.js';
import type { NextFunction } from 'express';
import mongoose from 'mongoose'; 

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

  async getAccountDetails(userId: string, accountNumber: string) {
    const account = await AccountModel.findOne(
      { accountNumber: accountNumber, userId: userId }, // filter
      { _id: 1, userId: 1, accountNumber: 1, balance: 1, type: 1, overDraftLimit: 1 }, // projection
    ).exec();
    return account;
  }

  // PATCH /users/:userId/accounts/:accountId
  async transaction(insertData: any) {
    return await AccountHistoryModel.create(insertData);
  }
  async updateAccountBalance(accountId: any) {
    const result = await AccountHistoryModel.aggregate([
      { $match: { accountId: new mongoose.Types.ObjectId(accountId) } },
      {
        $group: {
          _id: null,
          totalCredits: {
            $sum: {
              $cond: [{ $eq: ['$transaction', 'credit'] }, '$amount', 0],
            },
          },
          totalDebits: {
            $sum: {
              $cond: [{ $eq: ['$transaction', 'debit'] }, '$amount', 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          balance: { $subtract: ['$totalCredits', '$totalDebits'] },
        },
      },
    ]);
    const newBalance = result[0]?.balance || 0;
    const updatedAccount = await AccountModel.findOneAndUpdate(
      { _id: accountId },
      { balance: newBalance },
      { new: true },
    ).exec();

    return updatedAccount;
  }
}

