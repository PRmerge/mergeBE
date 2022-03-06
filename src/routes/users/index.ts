import { privateIntroRoutes } from './intro';
import { privateStackRoutes } from './stack';
import { privateUserIdRoutes} from './_userId';

export const privateUserRoutes = [ ...privateIntroRoutes, ...privateStackRoutes, ...privateUserIdRoutes ];
