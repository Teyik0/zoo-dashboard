import { Router } from 'express';
import {
  createArea,
  deleteAreaById,
  getAllAreas,
  getAreaById,
  updateAreaById,
} from '../controllers/area.controller';
import { isAuthenticated } from '../utils';

const areaRouter = Router();

areaRouter.get('/', getAllAreas);
areaRouter.get('/:id', getAreaById);
areaRouter.put('/:id', isAuthenticated, updateAreaById);
areaRouter.post('/', isAuthenticated, createArea);
areaRouter.delete('/:id', isAuthenticated, deleteAreaById);

export default areaRouter;
