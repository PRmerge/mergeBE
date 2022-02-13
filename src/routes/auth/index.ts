import {publicGithubRoutes} from './github';
import { Router } from 'express';

export const publicAuthRoutes = Router();

publicAuthRoutes.use(publicGithubRoutes);