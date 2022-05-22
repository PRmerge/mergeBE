import { Column, PrimaryGeneratedColumn, OneToMany, Entity, ManyToOne } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { LoginTypes } from '../../../types';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  githubId!: string;

  @Column()
  imgUrl!: string;

  @Column()
  userInfo!: string;

  @Column()
  stackList!: string;

  @Column()
  position!: string;

  @Column()
  token!: string;

  @OneToMany(() => Stack, (stack) => stack.user, { cascade: true })
  stack?: Stack[];

  // create New User Object
  static create(args: LoginTypes) {
    if (args) {
      return new User(args);
    }
    throw new Error('unexpected Error');
  }

  // create jwt token
  createToken() {
    return sign({ githubId: this.githubId }, process.env.JTW_SECRET_KEY!);
  }

  private constructor(args: LoginTypes) {
    if (args) {
      this.token = args.token;
      this.githubId = args.githubId;
      this.imgUrl = args.imgUrl;
      this.stackList = JSON.stringify(args.stackList);
      this.userInfo = args.userInfo;
      this.position = args.position;
    }
  }
}

@Entity()
export class Stack {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  stack!: string;

  @ManyToOne(() => User, (user) => user.stack, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  user!: never;

  static create(stack: string) {
    return new Stack(stack);
  }

  private constructor(stack: string) {
    this.stack = stack;
  }
}
