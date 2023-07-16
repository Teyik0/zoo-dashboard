import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();

export const cloud = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Usually I keep the token between 5 minutes - 15 minutes
export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: '8h',
  });
}

// I choosed 8h because i prefer to make the user login again each day.
// But keep him logged in if he is using the app.
// You can change this value depending on your app logic.
// I would go for a maximum of 7 days, and make him login again after 7 days of inactivity.
export function generateRefreshToken(userId: string, jti: string) {
  return jwt.sign(
    {
      userId,
      jti,
    },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: '8h',
    }
  );
}

export function generateTokens(userId: string, jti: string) {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId, jti);

  return {
    accessToken,
    refreshToken,
  };
}

export function hashToken(token: string) {
  return crypto.createHash('sha512').update(token).digest('hex');
}

import { isAuthenticated } from './middleware';
export { isAuthenticated };
