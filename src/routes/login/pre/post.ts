import { Router } from 'express';
import { UserService } from '../../../services/users/application/service';

const router = Router();
const userService = new UserService();

router.post('/login/pre', async (req, res, next) => {
  const { githubId } = req.body;

  try {
    const isUser = await userService.preLogin({ githubId });
    res.json({ data: isUser });
  } catch (err) {
    next(err);
  }
});

export default router;
