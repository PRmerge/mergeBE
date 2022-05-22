import { Router } from 'express';
import { publicLogin } from './login';

export const globalRouter = Router();

globalRouter.use([...publicLogin]);
