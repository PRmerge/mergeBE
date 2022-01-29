import { Router } from 'express';
import { UserAuth } from '../../../middlewares/auth/user-auth';
import { StackService } from '../../../services/stacks/application/service';

const router = Router();
const userAUth = new UserAuth();
const stackService = new StackService();

router.post('/users/stack', userAUth.loginUserAuth, stackService.createStack);

export default router;