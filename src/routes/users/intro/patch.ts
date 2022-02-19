import { Router } from 'express';
import { UserAuth } from '../../../middlewares/auth/user-auth';
import {UserService} from '../../../services/users/application/service';

const router = Router();
const userAuth = new UserAuth();
const userService = new UserService();

router.patch('/users/intro', userAuth.loginUserAuth, userService.saveUserIntro);

export default router;