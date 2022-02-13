import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';
import { Stack } from '../../stacks/domain/model';

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

  @OneToMany(() => Stack, stack => stack.user)
  stack: Stack[];
}