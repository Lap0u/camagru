import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Comments } from './comments.entity';
import { Pictures } from './pictures.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  token: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Pictures, (pictures) => pictures.author)
  @JoinColumn()
  pictures: Pictures[];

  @OneToMany(() => Comments, (comment) => comment.author)
  @JoinColumn()
  comments: Comment[];
}
