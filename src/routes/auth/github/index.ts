import { Router } from 'express';
import { publicCallbackRoutes } from './callback';
import get from './get';

export const publicGithubRoutes = Router();

publicGithubRoutes.use(publicCallbackRoutes, get);
