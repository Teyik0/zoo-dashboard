import { Request, Response } from 'express';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { prisma } from '../index';

//GET TOUS LES USERS
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    console.log('users list : ', users);
    return res.status(200).json(users);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//GET UN USER PAR ID
export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
};

//GET UN USER PAR EMAIL
export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

//MISE A JOUR D'UN USER PAR ID
export const updateUserById = async (req: Request, res: Response) => {
  const userParam: User = req.body;
  const userId = req.params.id;
  console.log('userParam : ', userParam);
  console.log('userId : ', userId);

  if (userId.length !== 24)
    return res
      .status(400)
      .json({ error: 'User id is not valid, it should be of length 24' });

  const isUserIdExist = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!isUserIdExist)
    return res.status(400).json({ error: 'User id does not exist' });

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: userParam.firstName,
        lastName: userParam.lastName,
        email: userParam.email,
        password: userParam.password,
        role: userParam.role,
      },
    });
    console.log('updatedUser : ', updatedUser);
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//CREATION D'UN USER
export const createUser = async (user: any) => {
  console.log('userParam : ', user);

  if (!user.email) return { error: 'Email is required' };
  if (!user.password) return { error: 'Password is required' };
  if (!user.firstName) return { error: 'First name is required' };
  if (!user.lastName) return { error: 'Last name is required' };

  user.password = bcrypt.hashSync(user.password, 12);

  try {
    const createdUser = await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });
    console.log('createdUser : ', createdUser);
    return {
      id: createdUser.id,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
      password: createdUser.password,
      role: createdUser.role,
    };
  } catch (error) {
    console.log('error : ', error);
    return { error: 'Something went wrong' };
  }
};

//SUPPRESSION D'UN USER PAR ID
export const deleteUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  console.log('userId : ', userId);

  if (userId.length !== 24)
    return res
      .status(400)
      .json({ error: 'User id is not valid, it should be of length 24' });

  const isUserIdExist = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!isUserIdExist)
    return res.status(400).json({ error: 'User id does not exist' });

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });
    console.log('deletedUser : ', deletedUser);
    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
