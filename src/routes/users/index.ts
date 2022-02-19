import get from './get';
import { privateIntroRoutes } from './intro';

export const privateUserRoutes = [ get, ...privateIntroRoutes ]
