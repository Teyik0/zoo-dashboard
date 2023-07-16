import { Request, Router } from 'express';
import { isAdmin, isAuthenticated } from '../utils/middleware';
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from '../controllers/user.controller';

const userRouter = Router();

interface AuthReq extends Request {
  payload?: {
    userId: string;
  };
}

userRouter.get('/profile', isAuthenticated, async (req: AuthReq, res, next) => {
  try {
    const { userId } = req.payload as { userId: string };
    const user = await getUserById(userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }

    res.status(200).json({
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
});

userRouter.get('/', isAuthenticated, getAllUsers);
userRouter.put('/:id', isAuthenticated, isAdmin, updateUserById);
userRouter.delete('/:id', isAuthenticated, isAdmin, deleteUserById);

export default userRouter;
