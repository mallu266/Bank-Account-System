import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET: string = process.env.JWT_SECRET || 'arjun';
const JWT_EXPIRY = (process.env.JWT_EXPIRY || '10h') as jwt.SignOptions['expiresIn'];
const options: jwt.SignOptions = { expiresIn: JWT_EXPIRY as any };
class JwtService {
  // Generate JWT
  static generateToken(payload: any) {
    return jwt.sign(payload, JWT_SECRET, options);
  }

  // Verify JWT
  static verifyToken(token: any) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return null; // or throw error if you prefer
    }
  }

  // Decode without verifying
  static decodeToken(token: any) {
    return jwt.decode(token);
  }
}

export default JwtService;
