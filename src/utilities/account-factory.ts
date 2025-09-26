import type BankAccount from '../abstractions/bank-account.js';
import { CurrentAccount } from '../accounts/current-account.js';
import { SavingsAccount } from '../accounts/saving-account.js';

type AccountConstructor = new (accountInfo: any) => BankAccount;

export class AccountFactory {
  private static accountRegistry = new Map<string, AccountConstructor>([
    ['savings', SavingsAccount],
    ['current', CurrentAccount],
  ]);

  static createAccount(accountInfo: any): BankAccount {
    const AccountClass = this.accountRegistry.get(accountInfo.type);
    if (AccountClass) {
      return new AccountClass(accountInfo);
    }
    throw new Error(`Unknown account type: ${accountInfo.type}`);
  }
}