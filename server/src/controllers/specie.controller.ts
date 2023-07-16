import { Request, Response } from 'express';
import { Specie } from '@prisma/client';
import { prisma } from '../index';

//GET TOUTES LES ESPECES
export const getAllSpecies = async (req: Request, res: Response) => {
  try {
    const species = await prisma.specie.findMany();
    console.log('species list : ', species);
    return res.status(200).json(species);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//GET UNE ESPECE PAR ID
export const getSpecieById = async (req: Request, res: Response) => {
  const specieId = req.params.id;
  console.log('specieId : ', specieId);

  if (specieId.length !== 24)
    return res
      .status(400)
      .json({ error: 'Specie id is not valid, it should be of length 24' });

  try {
    const specie = await prisma.specie.findUnique({
      where: { id: specieId },
    });
    if (!specie)
      return res.status(400).json({ error: 'Specie id does not exist' });
    console.log('specie : ', specie);
    return res.status(200).json(specie);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//MISE A JOUR D'UNE ESPECE PAR ID
export const updateSpecieById = async (req: Request, res: Response) => {
  const specieParam: Specie = req.body;
  const specieId = req.params.id;
  console.log('specieParam : ', specieParam);
  console.log('specieName : ', specieId);

  if (specieId.length !== 24)
    return res
      .status(400)
      .json({ error: 'Specie id is not valid, it should be of length 24' });

  const isSpecieIdExist = await prisma.specie.findUnique({
    where: { id: specieId },
  });
  if (!isSpecieIdExist)
    return res.status(400).json({ error: 'Specie id does not exist' });

  try {
    const specie = await prisma.specie.update({
      where: { id: specieId },
      data: {
        name: specieParam.name,
        imgUrl: specieParam.imgUrl,
        description: specieParam.description,
      },
    });
    console.log('specie : ', specie);
    return res.status(200).json(specie);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//CREATION D'UNE ESPECE
export const createSpecie = async (req: Request, res: Response) => {
  const specieParam: Specie = req.body;
  console.log('specieParam : ', specieParam);

  if (!specieParam.name)
    return res.status(400).json({ error: 'Name is required' });
  if (!specieParam.imgUrl)
    return res.status(400).json({ error: 'ImgUrl is required' });
  if (!specieParam.description)
    return res.status(400).json({ error: 'Description is required' });

  try {
    const specie = await prisma.specie.create({
      data: {
        name: specieParam.name,
        imgUrl: specieParam.imgUrl,
        description: specieParam.description,
      },
    });
    console.log('specie : ', specie);
    return res.status(200).json(specie);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//SUPPRESSION D'UNE ESPECE PAR ID
export const deleteSpecieById = async (req: Request, res: Response) => {
  const specieId = req.params.id;
  console.log('specieId : ', specieId);

  if (specieId.length !== 24)
    return res
      .status(400)
      .json({ error: 'Specie id is not valid, it should be of length 24' });

  const isSpecieIdExist = await prisma.specie.findUnique({
    where: { id: specieId },
  });
  if (!isSpecieIdExist)
    return res.status(400).json({ error: 'Specie id does not exist' });

  try {
    const specie = await prisma.specie.delete({
      where: { id: specieId },
    });
    console.log('specie : ', specie);
    return res.status(200).json(specie);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
