import { Router } from 'express';
import get from './get';

export const privateUserRoutes = Router();

privateUserRoutes.use(get);