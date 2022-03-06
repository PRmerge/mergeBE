import { Router } from 'express';
import { publicAuthRoutes } from './auth';
import { privateUserRoutes } from './users';
import get from './get';

export const globalRoutes = Router();

globalRoutes.use([...publicAuthRoutes, ...privateUserRoutes, get]);
