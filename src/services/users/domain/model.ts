import { Column, PrimaryGeneratedColumn, OneToMany, Entity, ManyToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  imgUrl: string;

  @Column({ nullable: true })
  infos: string;

  @Column()
  intro: string;

  @Column()
  githubAccessToken: string;

  @Column({ unique: true })
  githubIndex: number;

  @OneToMany(() => Stack, stack => stack.user, { cascade: true })
  stack: Stack[];

  static create(userName: string, imgUrl: string, githubAccessToken: string, githubIndex: number) {
    return new User(userName, imgUrl, githubAccessToken, githubIndex);
  }

  update(imgUrl?: string, githubAccessToken?: string, intro?: string, stacks?: string[]) {
    if (imgUrl && githubAccessToken) {
      this.imgUrl = imgUrl;
      this.githubAccessToken = githubAccessToken;
    } else if (intro) {
      this.intro = intro;
    } else {
      this.stack = stacks.map((stack) => {
        return Stack.create(stack);
      });
    }
  }

  private constructor(userName: string, imgUrl: string, githubAccessToken: string, githubIndex: number) {
    this.userName = userName;
    this.intro = `안녕하세요. ${ userName }입니다.`;
    this.imgUrl = imgUrl;
    this.githubAccessToken = githubAccessToken;
    this.githubIndex = githubIndex;
  }
}

@Entity()
export class Stack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stack: string;

  @ManyToOne(() => User, user => user.stack, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  user: never;

  static create(stack: string) {
    return new Stack(stack);
  }

  private constructor(stack: string) {
    this.stack = stack;
  }
}