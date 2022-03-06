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
  target: string;

  @Column()
  intro: string;

  @Column()
  githubAccessToken: string;

  @Column({ unique: true })
  githubIndex: number;

  @OneToMany(() => Stack, stack => stack.user, { cascade: true })
  stack: Stack[];

  userUpdate(imgUrl: string, githubAccessToken: string) {
    this.imgUrl = imgUrl;
    this.githubAccessToken = githubAccessToken;
  }

  introUpdate(intro: string) {
    this.intro = intro;
  }

  updateStack(stacks: string[]) {
    this.stack = stacks.map((stack) => {
      return new Stack(stack);
    });
  }

  constructor(userName: string, imgUrl: string, githubAccessToken: string, githubIndex: number) {
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

  constructor(stack: string) {
    this.stack = stack;
  }
}