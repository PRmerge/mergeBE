import { Router } from 'express';
import { publicAuthRoutes } from './auth';
import { privateUserRoutes } from './users';
import { privateInfosRouter} from './users/infos';
import get from './get';

export const globalRoutes = Router();

globalRoutes.use([...publicAuthRoutes, ...privateUserRoutes, ...privateInfosRouter, get]);
