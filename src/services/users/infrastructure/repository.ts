import { EntityRepository, AbstractRepository, getCustomRepository } from 'typeorm';
import { User } from '../domain/model';

@EntityRepository(User)
class UserCustomRepository extends AbstractRepository<User> {
  // create user
  save(user: User) {
    return this.manager.save(user);
  }

  // find By github ID
  findById(githubId: string) {
    return this.repository.findOne({ relations: ['stack'], where: { githubId } });
  }
}

export function UserRepository() {
  return getCustomRepository(UserCustomRepository);
}
