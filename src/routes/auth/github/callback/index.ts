import { Router } from 'express';
import get from './get';

export const publicCallbackRoutes: Router = Router();

publicCallbackRoutes.use(get);