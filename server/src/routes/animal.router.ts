import { Router } from 'express';

import {
  createAnimal,
  deleteAnimalById,
  getAllAnimals,
  getAnimalById,
  updateAnimalById,
} from '../controllers/animal.controller';
import { isAuthenticated } from '../utils';
import { isAdmin } from '../utils/middleware';

const animalRouter = Router();

animalRouter.get('/', getAllAnimals);
animalRouter.get('/:id', getAnimalById);
animalRouter.put('/:id', isAuthenticated, updateAnimalById);
animalRouter.post('/', isAuthenticated, createAnimal);
animalRouter.delete('/:id', isAuthenticated, isAdmin, deleteAnimalById);

export default animalRouter;
