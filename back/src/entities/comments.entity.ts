import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Pictures } from './pictures.entity';
import { User } from './users.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pictures, (pictures) => pictures.comments, {
    onDelete: 'CASCADE',
  })
  picture: Pictures;

  @Column()
  content: string;

  @CreateDateColumn()
  postedAt: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  author: User;
}
