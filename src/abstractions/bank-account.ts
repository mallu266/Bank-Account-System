import { AccountService } from '../services/AccountService.js';
import { type AccountInfo } from '../interfaces/account-info.js';
import {
  type TransactionData,
  type TransactionError,
  type TransactionResponse,
} from '../interfaces/transaction-data.js';
import { Types } from 'mongoose';

export default abstract class BankAccount {
  protected readonly accountId: Types.ObjectId;
  protected readonly accountNumber: string;
  protected readonly accountService: AccountService;
  protected balance: number;
  protected readonly userId: string;
  constructor(accountInfo: AccountInfo) {
    this.accountId = accountInfo._id;
    this.balance = accountInfo.balance;
    this.accountNumber = accountInfo.accountNumber;
    this.userId = accountInfo.userId;
    this.accountService = new AccountService();
  }

  /**
   * Creates transaction data object
   */
  private buildTransaction(amount: number): TransactionData {
    return {
      amount,
      transaction: 'credit',
    };
  }

  /**
   * Validates if the deposit amount is valid
   */
  private validateDeposit(amount: number): boolean {
    return amount > 0;
  }

  protected async updateTransaction(transaction: TransactionData) {
    await this.accountService.transaction({
      ...transaction,
      userId: this.userId,
      accountId: this.accountId,
    });
    const updatedAccount = await this.accountService.updateAccountBalance(this.accountId);
    this.balance = updatedAccount?.balance || 0;
    return updatedAccount;
  }

  /**
   * Validates withdrawal amount
   * Returns an error message if invalid, otherwise null
   */
  protected validateWithdraw(amount: number): any {
    const MIN_WITHDRAW = 100;
    if (amount < MIN_WITHDRAW) {
      return `Minimum withdrawal amount is ₹${MIN_WITHDRAW}`;
    }
    if (amount % 100 !== 0) {
      return 'Withdrawal amount must be in multiples of ₹100';
    }
    return null; // ✅ valid
  }

  /**
   * Deposits money into account
   */
  async deposit(amount: number): Promise<TransactionResponse | TransactionError> {
    if (!this.validateDeposit(amount)) {
      return { message: 'Invalid amount' };
    }
    const transaction = this.buildTransaction(amount);
    const updatedAccount = await this.updateTransaction(transaction);
    return {
      accountNumber: this.accountNumber,
      balance: updatedAccount?.balance || 0,
    };
  }

  abstract withdraw(amount: number): Promise<TransactionResponse | TransactionError>;
}
