import { User } from './users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Comments } from './comments.entity';

@Entity()
export class Pictures {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.pictures, { onDelete: 'CASCADE' })
  author: User;

  @OneToMany(() => Comments, (comments) => comments.picture)
  @JoinColumn()
  comments: Comments[];

  @CreateDateColumn()
  postedAt: Date;

  @Column({ type: 'bytea' })
  data: Uint8Array;
}
