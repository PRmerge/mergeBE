import { Router } from 'express';
import { UserAuth } from '../../middlewares/auth/user-auth';
import { GithubApi } from '../../services/users/application/github/service';

const router = Router();
const userAuth = new UserAuth();
const github = new GithubApi();

router.get('/users', userAuth.loginUserAuth, github.getUserProfile);

export default router;