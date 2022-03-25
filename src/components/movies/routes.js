import { Router } from 'express';
import MoviesController from './controller.js';

const moviesRouter = new Router();

export default (app) => {
  app.use('/movies', moviesRouter);

  moviesRouter.get('/', MoviesController.getMovies);

  moviesRouter.get('/:id', MoviesController.getMovie);

  moviesRouter.post('/', MoviesController.createMovie);

  moviesRouter.put('/:id', MoviesController.updateMovie);

  moviesRouter.delete('/:id', MoviesController.deleteMovie);
};
