import { Router } from 'express';
import { createUserController } from './users.controller';

const usersRouter = Router();

usersRouter.post('/', createUserController);

export default usersRouter;