import { NextFunction } from 'express';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getUserById } from '../controllers/user.controller';

declare module 'express' {
  interface Request {
    payload?: any;
  }
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error('🚫 Un-Authorized 🚫');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    req.payload = payload;
  } catch (err) {
    res.status(401);
    throw new Error('🚫 Un-Authorized 🚫');
  }

  return next();
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.payload;

  if (!userId) {
    res.status(401);
    throw new Error('Un-Authorized, User not authenticated');
  }

  const existingUser = await getUserById(userId);
  console.log('existingUser : ', existingUser);

  if (!existingUser) {
    res.status(401);
    throw new Error('Un-Authorized, User not found');
  }

  if (existingUser.role !== 'admin') {
    res.status(403);
    throw new Error('Un-Authorized, role is not admin');
  }

  return next();
}
