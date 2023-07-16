import { Request, Response } from 'express';
import { Area } from '@prisma/client';
import { prisma } from '../index';

//GET TOUS LES ESPACES
export const getAllAreas = async (req: Request, res: Response) => {
  try {
    const areas = await prisma.area.findMany();
    console.log('areas list : ', areas);
    return res.status(200).json(areas);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//GET UN ESPACE PAR ID
export const getAreaById = async (req: Request, res: Response) => {
  const areaId = req.params.id;
  console.log('areaId : ', areaId);

  if (areaId.length !== 24)
    return res
      .status(400)
      .json({ error: 'Area id is not valid, it should be of length 24' });

  try {
    const area = await prisma.area.findUnique({
      where: { id: areaId },
      include: { animals: true, visitor: true },
    });
    if (!area) return res.status(400).json({ error: 'Area id does not exist' });
    console.log('area : ', area);
    return res.status(200).json(area);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//MISE A JOUR D'UN ESPACE PAR ID
export const updateAreaById = async (req: Request, res: Response) => {
  const areaParam: Area = req.body;
  const areaId = req.params.id;
  console.log('areaParam : ', areaParam);
  console.log('areaName : ', areaId);

  if (areaId.length !== 24)
    return res
      .status(400)
      .json({ error: 'Area id is not valid, it should be of length 24' });

  const isAreaIdExist = await prisma.area.findUnique({
    where: { id: areaId },
  });
  if (!isAreaIdExist)
    return res.status(400).json({ error: 'Area id does not exist' });

  try {
    const area = await prisma.area.update({
      where: { id: areaId },
      data: {
        name: areaParam.name,
        capacity: areaParam.capacity,
        visiteDuration: areaParam.visiteDuration,
        description: areaParam.description,
        schedule: areaParam.schedule,
        handicapAccess: areaParam.handicapAccess,
        isInMaintenance: areaParam.isInMaintenance,
        imagesUrl: {
          set: areaParam.imagesUrl,
        },
      },
    });
    console.log('area updated : ', area);
    return res.status(200).json(area);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

//CREATION D'UN ESPACE
export const createArea = async (req: Request, res: Response) => {
  const areaParam: Area = req.body;
  console.log('areaParam : ', areaParam);
  if (!areaParam.name)
    return res.status(400).json({ error: 'Area name is required' });
  if (!areaParam.capacity)
    return res.status(400).json({ error: 'Area capacity is required' });
  if (!areaParam.visiteDuration)
    return res.status(400).json({ error: 'Area visiteDuration is required' });
  if (!areaParam.description)
    return res.status(400).json({ error: 'Area description is required' });
  if (!areaParam.schedule)
    return res.status(400).json({ error: 'Area schedule is required' });
  if (areaParam.handicapAccess === undefined)
    return res.status(400).json({ error: 'Area handicapAccess is required' });
  if (areaParam.isInMaintenance === undefined)
    return res.status(400).json({ error: 'Area isInMaintenance is required' });

  try {
    const areaAlreadyExist = await prisma.area.findUnique({
      where: { name: areaParam.name },
    });

    if (areaAlreadyExist)
      return res.status(400).json({ error: 'Area already exist' });

    const area = await prisma.area.create({
      data: {
        name: areaParam.name,
        capacity: areaParam.capacity,
        visiteDuration: areaParam.visiteDuration,
        description: areaParam.description,
        schedule: areaParam.schedule,
        handicapAccess: areaParam.handicapAccess,
        isInMaintenance: areaParam.isInMaintenance,
        imagesUrl: areaParam.imagesUrl,
      },
    });
    console.log('area created : ', area);
    return res.status(200).json(area);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

//SUPPRESSION D'UN ESPACE PAR ID
export const deleteAreaById = async (req: Request, res: Response) => {
  const areaId = req.params.id;
  console.log('areaId : ', areaId);

  if (areaId.length !== 24)
    return res
      .status(400)
      .json({ error: 'Area id is not valid, it should be of length 24' });

  const isAreaIdExist = await prisma.area.findUnique({
    where: { id: areaId },
  });
  if (!isAreaIdExist)
    return res.status(400).json({ error: 'Area id does not exist' });

  try {
    const area = await prisma.area.delete({
      where: { id: areaId },
    });
    console.log('area deleted : ', area);
    return res.status(200).json(area);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
