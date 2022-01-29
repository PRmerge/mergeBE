import get from './get';
import { privateIntroRoutes } from './intro';
import { privateStackRoutes } from './stack';

export const privateUserRoutes = [ get, ...privateIntroRoutes, ...privateStackRoutes ];
