import { EntityRepository, AbstractRepository } from 'typeorm';
import { User } from '../domain/model';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  // find By GihubId
  public findByGihubId(githubIndex: number) {
    return this.repository.findOne({ githubIndex });
  }

  // create user
  public saveUser(userName: string, imgUrl: string, githubAccessToken: string, githubIndex: number) {
    const user = new User();
    user.userName = userName;
    user.intro = `안녕하세요. ${userName}입니다.`;
    user.imgUrl = imgUrl;
    user.githubAccessToken = githubAccessToken;
    user.githubIndex = githubIndex;
    return this.manager.save(user);
  }

  // update user
  public updateUser(user: User, userName: string, imgUrl: string, githubAccessToken: string) {
    user.userName = userName;
    user.imgUrl = imgUrl;
    user.githubAccessToken = githubAccessToken;
    return this.manager.save(user);
  }

  // update user intro
  public async updateUserIntro(githubIndex: number, intro: string) {
    const user = await this.repository.findOne({ githubIndex });
    console.log(githubIndex);
    console.log(user);
    user.intro = intro;
    return this.manager.save(user);
  }
}
