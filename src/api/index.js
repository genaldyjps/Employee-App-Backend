import express from 'express';
import { employeeRouter } from './resources/employee';
import { userRouter } from './resources/user';

export const restRouter = express.Router();
restRouter.use('/employees', employeeRouter);
restRouter.use('/users', userRouter);