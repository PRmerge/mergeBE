import { UserRepository } from '../infrastructure/repository';

export class UserService {
  private userRepository = UserRepository;
  // get 10 users
  getTenUser() {
    return this.userRepository().findRandom();
  }

  // create intro
  async saveUserIntro(intro: string, githubIndex: number) {
    const user = await this.userRepository().findByGithubId(githubIndex);
    user.introUpdate(intro);
    return this.userRepository().save(user);
  };

  // Add user's stack
  async updateStack(githubIndex: number, stacks: string[]) {
    const user = await this.userRepository().findByGithubId(githubIndex);
    user.updateStack(stacks);
    return this.userRepository().save(user);
  }
}