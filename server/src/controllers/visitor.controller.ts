import { Request, Response } from 'express';
import { Visitor } from '@prisma/client';
import { prisma } from '../index';

//GET TOUS LES VISITEURS
export const getAllVisitors = async (req: Request, res: Response) => {
  try {
    const visitors = await prisma.visitor.findMany({
      include: { isCurrentlyInArea: true, billet: true },
    });
    console.log('visitors list : ', visitors);
    return res.status(200).json(visitors);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//GET UN VISITEUR PAR ID
export const getVisitorById = async (req: Request, res: Response) => {
  const visitorId = req.params.id;
  console.log('visitorId : ', visitorId);

  if (visitorId.length !== 24)
    return res
      .status(400)
      .json({ error: 'Visitor id is not valid, it should be of length 24' });

  try {
    const visitor = await prisma.visitor.findUnique({
      where: { id: visitorId },
      include: { isCurrentlyInArea: true },
    });
    if (!visitor)
      return res.status(400).json({ error: 'Visitor id does not exist' });
    console.log('visitor : ', visitor);
    return res.status(200).json(visitor);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//MISE A JOUR D'UN VISITEUR PAR ID
export const updateVisitorById = async (req: Request, res: Response) => {
  const visitorParam: Visitor = req.body;
  const visitorId = req.params.id;
  console.log('visitorParam : ', visitorParam);
  console.log('visitorName : ', visitorId);

  if (visitorId.length !== 24)
    return res
      .status(400)
      .json({ error: 'Visitor id is not valid, it should be of length 24' });

  const isVisitorIdExist = await prisma.visitor.findUnique({
    where: { id: visitorId },
  });
  if (!isVisitorIdExist)
    return res.status(400).json({ error: 'Visitor id does not exist' });

  try {
    const visitor = await prisma.visitor.update({
      where: { id: visitorId },
      data: {
        firstName: visitorParam.firstName,
        lastName: visitorParam.lastName,
        email: visitorParam.email,
        isCurrentlyInArea: {
          connect: { id: visitorParam.areaId as string },
        },
      },
    });
    console.log('visitor : ', visitor);
    return res.status(200).json(visitor);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//SUPPRESSION D'UN VISITEUR PAR ID
export const deleteVisitorById = async (req: Request, res: Response) => {
  const visitorId = req.params.id;
  console.log('visitorId : ', visitorId);

  if (visitorId.length !== 24)
    return res
      .status(400)
      .json({ error: 'Visitor id is not valid, it should be of length 24' });

  const isVisitorIdExist = await prisma.visitor.findUnique({
    where: { id: visitorId },
  });
  if (!isVisitorIdExist)
    return res.status(400).json({ error: 'Visitor id does not exist' });

  try {
    const visitor = await prisma.visitor.delete({
      where: { id: visitorId },
    });
    console.log('visitor : ', visitor);
    return res.status(200).json(visitor);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//CREATION D'UN VISITEUR
export const createVisitor = async (req: Request, res: Response) => {
  const visitorParam: Visitor = req.body;
  console.log('visitorParam : ', visitorParam);

  if (!visitorParam.firstName || !visitorParam.lastName || !visitorParam.email)
    return res.status(400).json({
      error:
        'Visitor firstName, lastName and email are required to create a visitor',
    });

  try {
    const visitor = await prisma.visitor.create({
      data: {
        firstName: visitorParam.firstName,
        lastName: visitorParam.lastName,
        email: visitorParam.email,
      },
    });
    console.log('visitor : ', visitor);
    return res.status(200).json(visitor);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
