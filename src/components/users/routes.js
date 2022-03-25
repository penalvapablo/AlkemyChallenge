import { Router } from 'express';
import isRegistered from './utils/isRegistered.js';
import UsersController from './controller.js';

const usersRouter = new Router();

export default (app) => {
  app.use('/auth', usersRouter);

  usersRouter.post('/register', isRegistered, UsersController.register);

  usersRouter.post('/login', UsersController.login);
};
