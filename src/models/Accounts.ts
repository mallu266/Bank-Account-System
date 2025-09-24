import mongoose, { Document, Schema, type ObjectId } from 'mongoose';

export interface IAccount {
  userId: ObjectId;
  accountNumber: string;
  branch: string;
  type: string;
  balance: number;
  overDraftLimit?: number;
  pin: string;
  createdAt: Date;
}
const AccountSchema = new Schema<IAccount>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  accountNumber: { type: String, required: true, unique: true },
  branch: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['savings', 'current', 'credit', 'loan'],
  },
  balance: { type: Number, required: true, default: 0 },
  overDraftLimit: { type: Number },
  pin: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
// Compound unique index
AccountSchema.index({ userId: 1, branch: 1, type: 1 }, { unique: true });
export const AccountModel = mongoose.model<IAccount>('Accounts', AccountSchema);
