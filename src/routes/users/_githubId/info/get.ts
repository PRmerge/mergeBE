import { Router } from 'express';
import { UserService } from '../../../../services/users/application/service';
import { UserAuth } from '../../../../middlewares/auth';

const router = Router();
const userService = new UserService();
const userAuth = new UserAuth();

router.get('/users/:githubId/info', userAuth.loginUserAuth, async (req, res, next) => {
  const { githubId } = req.params;

  try {
    const user = await userService.getUserInformation({ githubId });
    res.json({ data: user });
  } catch (err) {
    next(err);
  }
});

export default router;
