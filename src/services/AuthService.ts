import { UserModel } from '../models/User.js';

export class AuthService {
  async login(email: string, password: string): Promise<any> {
    const user = await UserModel.findOne({ email, password });
    if (!user) {
      return null;
    }
    return user;
  }

  async register(data: any) {
    const user = await UserModel.create(data);
    return user;
  }
}
