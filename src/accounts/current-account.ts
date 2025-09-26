import type { AccountInfo } from "../interfaces/account-info.js";
import BankAccount from "../abstractions/bank-account.js";
import type {
  TransactionData,
  TransactionError,
  TransactionResponse,
} from "../interfaces/transaction-data.js";

// Subclass: Savings Account
export class CurrentAccount extends BankAccount {
  protected overDraftLimit: number = 0;
  constructor(accountInfo: AccountInfo) {
    super(accountInfo);
    this.overDraftLimit = accountInfo.overDraftLimit || 0;
  }

  override async withdraw(
    amount: number,
  ): Promise<TransactionResponse | TransactionError> {
    const validation = this.validateWithdraw(amount);
    if (validation) {
      return { message: validation };
    }
    if (this.balance + this.overDraftLimit >= amount) {
      const updateData: TransactionData = {
        amount,
        transaction: "debit",
      };
      const updatedAccount = await this.updateTransaction(updateData);
      return {
        accountNumber: this.accountNumber,
        balance: updatedAccount?.balance || 0,
        availableLimit: this.overDraftLimit + (updatedAccount?.balance || 0),
      };
    }
    return { message: "Insufficient/Overdraft balance in Current Account" };
  }
}
