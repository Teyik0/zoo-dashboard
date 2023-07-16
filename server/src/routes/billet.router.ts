import { Router } from 'express';

import {
  createBillet,
  deleteBilletById,
  getAllBillets,
  getBilletById,
  updateBilletById,
} from '../controllers/billet.controller';

import { isAuthenticated } from '../utils';

const billetRouter = Router();

billetRouter.get('/', getAllBillets);
billetRouter.get('/:id', getBilletById);
billetRouter.put('/:id', isAuthenticated, updateBilletById);
billetRouter.post('/', isAuthenticated, createBillet);
billetRouter.delete('/:id', isAuthenticated, deleteBilletById);

export default billetRouter;
