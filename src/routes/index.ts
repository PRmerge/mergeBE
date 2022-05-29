import { Router } from 'express';
import { publicLogin } from './login';
import { privateUsersRouter } from './users';
import get from './get';

export const globalRouter = Router();

globalRouter.use([...publicLogin, ...privateUsersRouter, get]);
