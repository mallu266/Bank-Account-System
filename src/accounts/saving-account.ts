import type { AccountInfo } from "../interfaces/account-info";
import type {
  TransactionData,
  TransactionError,
  TransactionResponse,
} from "../interfaces/transaction-data";
import BankAccount from "../abstractions/bank-account";

// Subclass: Savings Account
export class SavingsAccount extends BankAccount {
  constructor(accountInfo: AccountInfo) {
    super(accountInfo);
  }
  override async withdraw(
    amount: number,
  ): Promise<TransactionResponse | TransactionError> {
    const validation = this.validateWithdraw(amount);
    if (validation) {
      return { message: validation };
    }
    if (amount > this.balance) {
      return { message: "Insufficient balance in Savings Account" };
    }
    const updateData: TransactionData = {
      amount,
      transaction: "debit",
    };
    const updatedAccount = await this.updateTransaction(updateData);
    return {
      accountNumber: this.accountNumber,
      balance: updatedAccount?.balance || 0,
    };
  }
}
