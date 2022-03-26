import { Request, Response, NextFunction, Router } from 'express';
import { UserAuth } from '../../../middlewares/auth/user-auth';
import { UserService } from '../../../services/users/application/service';

const router = Router();
const userAuth = new UserAuth();
const userService = new UserService();

router.patch('/users/infos', userAuth.loginUserAuth, async (req: Request, res: Response, next: NextFunction) => {
  const { user, githubToken } = res.locals;

  const userInfos = await userService.updateGithubInfos(user, githubToken);

  res.status(200).json({ data: {...userInfos}});
})

export default router;
