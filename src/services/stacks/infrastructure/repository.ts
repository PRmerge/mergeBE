import { AbstractRepository, getCustomRepository, EntityRepository } from 'typeorm';
import { Stack } from '../domain/model';
import { User } from '../../users/domain/model';

@EntityRepository(Stack)
class StackCustomRepository extends AbstractRepository<Stack> {
  // createStack
  public creatStack(user: User, stack: string) {
    const userStack = new Stack();
    userStack.stack = stack;
    userStack.user = user;
    return this.manager.save(userStack);
  }
}

// export custom repository
export const StackRepository = () => {
  return getCustomRepository(StackCustomRepository);
};