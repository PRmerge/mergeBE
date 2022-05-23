import { Router } from 'express';
import { UserService } from '../../../services/users/application/service';
import { UserAuth } from '../../../middlewares/auth';

const router = Router();
const userService = new UserService();
const userAuth = new UserAuth();

router.patch('/users/intro', userAuth.loginUserAuth, async (req, res, next) => {
  const { userInfo }: { userInfo: string } = req.body;
  const { githubId } = res.locals;
  try {
    const updateUser = await userService.updateIntro({ githubId, userInfo });

    res.json({ data: updateUser.userInfo });
  } catch (err) {
    next(err);
  }
});

export default router;
