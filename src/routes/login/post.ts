import { Router } from 'express';
import { UserService } from '../../services/users/application/service';
import { LoginTypes } from '../../types';

const router = Router();
const userService = new UserService();

router.post('/login', async (req, res, next) => {
  const { token, githubId, imgUrl, stackList, userInfo, position }: LoginTypes = req.body;

  try {
    const loginToken = await userService.login({
      token,
      githubId,
      imgUrl,
      stackList,
      userInfo,
      position,
    });
    res.json({ loginToken });
  } catch (err) {
    next(err);
  }
});

export default router;
