import { Request, Response } from 'express';
import { Billet } from '@prisma/client';
import { prisma } from '../index';

//GET TOUS LES BILLETS
export const getAllBillets = async (req: Request, res: Response) => {
  try {
    const billets = await prisma.billet.findMany();
    console.log('billets list : ', billets);
    return res.status(200).json(billets);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//GET UN BILLET PAR ID
export const getBilletById = async (req: Request, res: Response) => {
  const billetId = req.params.id;
  console.log('billetId : ', billetId);

  if (billetId.length !== 24)
    return res
      .status(400)
      .json({ error: 'Billet id is not valid, it should be of length 24' });

  try {
    const billet = await prisma.billet.findUnique({
      where: { id: billetId },
      include: { autorizedArea: true, visitor: true },
    });
    if (!billet)
      return res.status(400).json({ error: 'Billet id does not exist' });
    console.log('billet : ', billet);
    return res.status(200).json(billet);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//MISE A JOUR D'UN BILLET PAR ID
export const updateBilletById = async (req: Request, res: Response) => {
  const billetParam: Billet = req.body;
  const billetId = req.params.id;
  console.log('billetParam : ', billetParam);
  console.log('billetName : ', billetId);

  if (billetId.length !== 24)
    return res
      .status(400)
      .json({ error: 'Billet id is not valid, it should be of length 24' });

  const isBilletIdExist = await prisma.billet.findUnique({
    where: { id: billetId },
  });
  if (!isBilletIdExist)
    return res.status(400).json({ error: 'Billet id does not exist' });
  if (!billetParam.visitorId)
    return res.status(400).json({ error: 'Visitor id is required' });
  if (billetParam.areaId.length === 0)
    return res.status(400).json({ error: 'Authorized area ids is required' });

  try {
    const billet = await prisma.billet.update({
      where: { id: billetId },
      data: {
        category: billetParam.category,
        pass: billetParam.pass,
        price: billetParam.price,
        expiredAt: billetParam.expiredAt,
        isExpired: billetParam.isExpired,
        visitor: {
          connect: { id: billetParam.visitorId },
        },
        autorizedArea: {
          connect: billetParam.areaId.map((id) => ({ id })),
        },
      },
    });
    console.log('billet : ', billet);
    return res.status(200).json(billet);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//CREATION D'UN BILLET
export const createBillet = async (req: Request, res: Response) => {
  const billetParam: Billet = req.body;
  console.log('billetParam : ', billetParam);

  if (!billetParam.visitorId)
    return res.status(400).json({ error: 'Visitor id is required' });
  if (!billetParam.areaId)
    return res.status(400).json({ error: 'Authorized area ids is required' });
  if (!billetParam.category)
    return res.status(400).json({ error: 'Category is required' });
  if (!billetParam.pass)
    return res.status(400).json({ error: 'Pass is required' });
  if (!billetParam.price)
    return res.status(400).json({ error: 'Price is required' });
  if (!billetParam.expiredAt)
    return res.status(400).json({ error: 'Expired at is required' });

  try {
    const billet = await prisma.billet.create({
      data: {
        category: billetParam.category,
        pass: billetParam.pass,
        price: billetParam.price,
        expiredAt: billetParam.expiredAt,
        visitor: {
          connect: { id: billetParam.visitorId },
        },
        autorizedArea: {
          connect: billetParam.areaId.map((id) => ({ id })),
        },
      },
    });
    console.log('billet : ', billet);
    return res.status(200).json(billet);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//SUPPRESSION D'UN BILLET PAR ID
export const deleteBilletById = async (req: Request, res: Response) => {
  const billetId = req.params.id;
  console.log('billetId : ', billetId);

  if (billetId.length !== 24)
    return res
      .status(400)
      .json({ error: 'Billet id is not valid, it should be of length 24' });

  try {
    const billet = await prisma.billet.delete({
      where: { id: billetId },
    });
    console.log('billet : ', billet);
    return res.status(200).json(billet);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
