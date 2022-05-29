import { UserRepository } from '../infrastructure/repository';
import { User } from '../domain/model';
import { LoginTypes } from '../../../types';

export class UserService {
  private userRepository = UserRepository;

  // pre-login
  preLogin({ githubId }: { githubId: string }) {
    return this.userRepository().findById(githubId);
  }

  // login
  async login({ token, githubId, imgUrl, stackList, userInfo, position }: LoginTypes) {
    const user = await this.userRepository().findById(githubId);
    if (!user) {
      const newUser = await User.create({ token, githubId, imgUrl, stackList, userInfo, position });
      await this.userRepository().save(newUser);
      return newUser.createToken();
    }

    // FIXME: 유저 업데이트도 필요할려나...
    return user.createToken();
  }

  // get user's info
  async getUserInformation({ githubId }: { githubId: string }) {
    const user = await this.userRepository().findById(githubId);

    if (!user) {
      throw new Error(`A such ${githubId} is not existed.`);
    }
    return user;
  }

  // update user intro
  async updateIntro({ githubId, userInfo }: { githubId: string; userInfo: string }) {
    const user = await this.userRepository().findById(githubId);

    if (!user) {
      // FIXME: error message 세세하게 설명
      throw new Error('Not found User');
    }
    user.update({ userInfo });
    return this.userRepository().save(user);
  }
}
