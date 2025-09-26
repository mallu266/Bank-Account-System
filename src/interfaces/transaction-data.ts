export interface TransactionData {
  amount: number;
  chequeNumber?: string;
  transaction: "credit" | "debit";
}
export interface TransactionResponse {
  accountNumber: string;
  balance: number;
  availableLimit?: number;
  chequeNumber?: string;
}

export interface TransactionError {
  message: string;
}
