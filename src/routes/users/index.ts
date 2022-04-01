import { privateIntroRoutes } from './intro';
import { privateStackRoutes } from './stacks';
import { privateUserIdRoutes} from './_userId';

export const privateUserRoutes = [ ...privateIntroRoutes, ...privateStackRoutes, ...privateUserIdRoutes ];
