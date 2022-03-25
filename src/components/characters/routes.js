import { Router } from 'express';
import CharacterController from './controller.js';
import authToken from '../../middlewares/authToken.js';

const characterRouter = new Router();

export default (app) => {
  app.use('/characters', characterRouter);

  characterRouter.get('/', CharacterController.getCharacters);

  characterRouter.get('/:id', CharacterController.getCharacter);

  characterRouter.post('/', CharacterController.createCharacter);

  characterRouter.put('/:id', CharacterController.updateCharacter);

  characterRouter.delete('/:id', CharacterController.deleteCharacter);
};
