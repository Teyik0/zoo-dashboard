import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  addRefreshTokenToWhitelist,
  deleteRefreshToken,
  findRefreshTokenById,
  revokeTokens,
} from '../controllers/auth.controller';
import { generateTokens } from '../utils';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { hashToken } from '../utils';

const authRouter = Router();
import {
  getUserByEmail,
  createUser,
  getUserById,
} from '../controllers/user.controller';
import { User } from '@prisma/client';

authRouter.post('/register', async (req, res, next) => {
  try {
    const { email, password, role, firstName, lastName }: User = req.body;
    console.log('req.body : ', req.body);
    if (!email || !password || !firstName || !lastName) {
      res.status(400);
      throw new Error(
        'You must provide an email, password, fisrtName and lastName at least.'
      );
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      res.status(400);
      throw new Error('Email already in use.');
    }

    const user = await createUser({
      firstName,
      lastName,
      email,
      password,
      role: role === undefined ? 'undefined' : role,
    });

    if (!user.id) {
      res.status(500);
      throw new Error('Something went wrong.');
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user.id, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('You must provide an email and a password.');
    }
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser.id, jti);
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: existingUser.id,
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/refreshToken', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400);
      throw new Error('Missing refresh token.');
    }
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as jwt.JwtPayload;
    const savedRefreshToken = await findRefreshTokenById(payload.jti!);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const user = await getUserById(payload.userId);
    if (!user) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user.id,
      jti
    );
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }

  authRouter.post('/revokeRefreshTokens', async (req, res, next) => {
    try {
      const { userId }: { userId: string } = req.body;
      await revokeTokens(userId);
      res.json({ message: `Tokens revoked for user with id #${userId}` });
    } catch (err) {
      next(err);
    }
  });
});

export default authRouter;
