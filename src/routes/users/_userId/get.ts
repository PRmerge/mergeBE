import { Router, Request, Response, NextFunction } from 'express';
import { UserAuth } from '../../../middlewares/auth/user-auth';
import { GithubApi } from '../../../services/users/application/github/service';

// Todo: login Auth
const router = Router();
const userAuth = new UserAuth();
const github = new GithubApi();

router.get('/users/:userName', userAuth.loginUserAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName } = req.params;
    const { githubToken } = res.locals;
    const user = await github.getUserProfile(userName, githubToken);

    const { login, avatar_url, url, repos_url } = user.data;
    res.json({
      data: {
        nickname: login,
        imgUrl: avatar_url,
        userUrl: url,
        reposUrl: repos_url,
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;