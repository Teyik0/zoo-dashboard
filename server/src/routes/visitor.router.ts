import { Router } from 'express';

import {
  createVisitor,
  deleteVisitorById,
  getAllVisitors,
  getVisitorById,
  updateVisitorById,
} from '../controllers/visitor.controller';

import { isAuthenticated } from '../utils';

const visitorRouter = Router();

visitorRouter.get('/', getAllVisitors);
visitorRouter.get('/:id', getVisitorById);
visitorRouter.put('/:id', isAuthenticated, updateVisitorById);
visitorRouter.post('/', isAuthenticated, createVisitor);
visitorRouter.delete('/:id', isAuthenticated, deleteVisitorById);

export default visitorRouter;
