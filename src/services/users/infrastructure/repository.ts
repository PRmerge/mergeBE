import { EntityRepository, AbstractRepository, getCustomRepository } from 'typeorm';
import { User } from '../domain/model';

@EntityRepository(User)
class UserCustomRepository extends AbstractRepository<User> {
  // getMain
  // Todo: Need to Random
  findRandom() {
    return this.repository.find({ take: 10 });
  }

  // create user
  save(user: User) {
    return this.manager.save(user);
  }

  // find By GithubId
  findByGithubId(githubIndex: number) {
    return this.repository.findOne({ relations: [ 'stack' ], where: { githubIndex } });
  }
}

export function UserRepository() {
  return getCustomRepository(UserCustomRepository);
}