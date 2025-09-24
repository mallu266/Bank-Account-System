import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader: string = req.headers.authorization || '';
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token: string = authHeader.split(' ')[1] || '';
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === 'string') {
      return res.status(401).json({ message: 'Invalid token payload' });
    }
    req.user = decoded as Express.UserPayload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
