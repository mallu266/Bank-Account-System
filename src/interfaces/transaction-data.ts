export interface TransactionData {
  amount: number;
  transaction: 'credit' | 'debit';
}
export interface TransactionResponse {
  accountNumber: string;
  balance: number;
  availableLimit?: number;
}

export interface TransactionError {
  message: string;
}
