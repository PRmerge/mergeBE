import { NextFunction, Request, Response, Router } from 'express';
import { UserAuth } from '../../../middlewares/auth/user-auth';
import { UserService } from '../../../services/users/application/service';

const router = Router();
const userAuth = new UserAuth();
const userService = new UserService();

// Todo: 사용자 인증 구현시 수정
router.patch('/users/intro', userAuth.loginUserAuth, async (req: Request, res: Response, next: NextFunction) => {
  const { intro }: { intro: string } = req.body;
  const { githubIndex } = res.locals;

  try {
    const response = await userService.saveUserIntro(intro, githubIndex);

    res.json({ data: response.intro })
  } catch (err) {
    next(err);
  }

});

export default router;