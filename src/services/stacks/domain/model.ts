import {Column, PrimaryGeneratedColumn, ManyToOne, Entity} from 'typeorm';
import { User } from '../../users/domain/model';

@Entity()
export class Stack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stack: string;

  @ManyToOne(() => User, user => user.stack)
  user: User;
}