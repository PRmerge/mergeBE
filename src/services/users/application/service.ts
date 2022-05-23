import { UserRepository } from '../infrastructure/repository';
import { User } from '../domain/model';
import { LoginTypes } from '../../../types';

export class UserService {
  private userRepository = UserRepository;

  // login
  async login({ token, githubId, imgUrl, stackList, userInfo, position }: LoginTypes) {
    const user = await this.userRepository().findById(githubId);

    if (!user) {
      const newUser = await User.create({ token, githubId, imgUrl, stackList, userInfo, position });
      await this.userRepository().save(newUser);
      // NOTE: 제대로 DB 저장이 되었는지 확인
      console.log(newUser);
      return newUser.createToken();
    }

    // FIXME: 유저 업데이트도 필요할려나...
    return user.createToken();
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
