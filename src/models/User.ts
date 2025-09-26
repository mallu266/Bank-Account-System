import mongoose, { Document, Schema } from "mongoose";

// Root document (User)
export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
}
// User schema
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Model
export const UserModel = mongoose.model<IUser>("User", UserSchema);
