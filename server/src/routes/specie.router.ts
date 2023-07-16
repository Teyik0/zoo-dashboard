import { Router } from 'express';

import {
  createSpecie,
  deleteSpecieById,
  getAllSpecies,
  getSpecieById,
  updateSpecieById,
} from '../controllers/specie.controller';
import { isAuthenticated } from '../utils';

const specieRouter = Router();

specieRouter.get('/', getAllSpecies);
specieRouter.get('/:id', getSpecieById);
specieRouter.put('/:id', isAuthenticated, updateSpecieById);
specieRouter.post('/', isAuthenticated, createSpecie);
specieRouter.delete('/:id', isAuthenticated, deleteSpecieById);

export default specieRouter;
