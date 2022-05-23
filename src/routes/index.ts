import { Router } from 'express';
import { publicLogin } from './login';
import { privateUsersRouter } from './users';

export const globalRouter = Router();

globalRouter.use([...publicLogin, ...privateUsersRouter]);
