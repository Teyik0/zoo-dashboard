import { Request, Response } from 'express';
import { Animal } from '@prisma/client';
import { prisma } from '../index';

//GET TOUS LES ANIMAUX
export const getAllAnimals = async (req: Request, res: Response) => {
  try {
    const animals = await prisma.animal.findMany({
      include: { area: true, specie: true },
    });
    console.log('animals list : ', animals);
    return res.status(200).json(animals);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//GET UN ANIMAL PAR ID
export const getAnimalById = async (req: Request, res: Response) => {
  const animalId = req.params.id;
  console.log('animalId : ', animalId);

  if (animalId.length !== 24)
    return res
      .status(400)
      .json({ error: 'Animal id is not valid, it should be of length 24' });

  try {
    const animal = await prisma.animal.findUnique({
      where: { id: animalId },
      include: { area: true, specie: true },
    });
    if (!animal)
      return res.status(400).json({ error: 'Animal id does not exist' });
    console.log('animal : ', animal);
    return res.status(200).json(animal);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//MISE A JOUR D'UN ANIMAL PAR ID
export const updateAnimalById = async (req: Request, res: Response) => {
  const animalParam: Animal = req.body;
  const animalId = req.params.id;
  console.log('animalParam : ', animalParam);
  console.log('animalId : ', animalId);

  if (animalId.length !== 24)
    return res
      .status(400)
      .json({ error: 'Animal id is not valid, it should be of length 24' });
  if (animalParam.areaId?.length !== 24)
    return res
      .status(400)
      .json({ error: 'Area Id is not valid, it should be of length 24' });
  if (animalParam.specieId?.length !== 24)
    return res
      .status(400)
      .json({ error: 'Specie Id is not valid, it should be of length 24' });

  const isAnimalIdExist = await prisma.animal.findUnique({
    where: { id: animalId },
  });
  console.log('isAnimalIdExist : ', isAnimalIdExist);
  if (!isAnimalIdExist)
    return res.status(400).json({ error: 'Animal id does not exist' });

  try {
    const animal = await prisma.animal.update({
      where: { id: animalId },
      data: {
        name: animalParam.name,
        area: {
          connect: { id: animalParam.areaId },
        },
        specie: {
          connect: { id: animalParam.specieId },
        },
      },
    });
    console.log('animal : ', animal);
    return res.status(200).json(animal);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//CREATION D'UN ANIMAL
export const createAnimal = async (req: Request, res: Response) => {
  const animalParam: Animal = req.body;
  console.log('animalParam : ', animalParam);
  if (!animalParam.name)
    return res.status(400).json({ error: 'Animal name is required' });
  if (!animalParam.specieId)
    return res.status(400).json({ error: 'Specie ID is required' });
  if (!animalParam.areaId)
    return res.status(400).json({ error: 'Area ID is required' });

  try {
    const animal = await prisma.animal.create({
      data: {
        name: animalParam.name,
        area: {
          connect: { id: animalParam.areaId },
        },
        specie: {
          connect: { id: animalParam.specieId },
        },
      },
    });
    console.log('animal : ', animal);
    return res.status(200).json(animal);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//SUPPRESSION D'UN ANIMAL PAR ID
export const deleteAnimalById = async (req: Request, res: Response) => {
  const animalId = req.params.id;
  console.log('animalId : ', animalId);

  if (animalId.length !== 24)
    return res
      .status(400)
      .json({ error: 'Animal id is not valid, it should be of length 24' });

  const isAnimalIdExist = await prisma.animal.findUnique({
    where: { id: animalId },
  });
  if (!isAnimalIdExist)
    return res.status(400).json({ error: 'Animal id does not exist' });

  try {
    const animal = await prisma.animal.delete({
      where: { id: animalId },
    });
    console.log('animal : ', animal);
    return res.status(200).json(animal);
  } catch (error) {
    console.log('error : ', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
