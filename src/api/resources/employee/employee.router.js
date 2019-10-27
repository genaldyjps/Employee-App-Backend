import express from 'express';
import employeeController from './employee.controller';

export const employeeRouter = express.Router();
employeeRouter
  .route('/')
  .post(employeeController.create)
  .get(employeeController.findAll);

  employeeRouter
  .route('/:id')
  .put(employeeController.update)
  .delete(employeeController.delete)
  .get(employeeController.findOne);