import { Router } from 'express';
import { publicAuthRoutes } from './auth';
import { privateUserRoutes } from './users';


export const globalRoutes = Router();

globalRoutes.use(publicAuthRoutes);
globalRoutes.use(privateUserRoutes);
