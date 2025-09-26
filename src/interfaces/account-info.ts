import { Types } from "mongoose";

export interface AccountInfo {
  _id: Types.ObjectId;
  accountNumber: string;
  userId: string;
  balance: number;
  overDraftLimit?: number;
}
