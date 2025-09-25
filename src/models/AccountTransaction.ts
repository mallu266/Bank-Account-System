import mongoose, { Schema, type ObjectId } from 'mongoose';

export interface IAccount {
  userId: ObjectId;
  accountId: ObjectId;
  transaction: string;
  amount: number;
  createdAt: Date;
}
const AccountHistorySchema = new Schema<IAccount>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  accountId: { type: Schema.Types.ObjectId, ref: 'Accounts', required: true },
  transaction: {
    type: String,
    required: true,
    enum: ['debit', 'credit', 'transfer', 'payment', 'loan'],
  },
  amount: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
// Compound unique index
AccountHistorySchema.index({ accountId: 1 });
export const AccountHistoryModel = mongoose.model<IAccount>('AccountHistory', AccountHistorySchema);
