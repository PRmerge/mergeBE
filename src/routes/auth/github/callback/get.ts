import { Router } from 'express';
import { GithubLoginService } from '../../../../services/users/application/github/login/service';

const router = Router();
const githubLoginService = new GithubLoginService();

router.get('/auth/github/callback', githubLoginService.getGithubCallback);

export default router;
