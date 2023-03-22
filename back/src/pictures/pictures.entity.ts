import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Pictures {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  author: string;

  @CreateDateColumn()
  postedAt: Date;

  @Column({ type: 'bytea' })
  data: Uint8Array;

  // @Column()
  // likes: User[]; //les utilisateurs qui ont liké

  // @Column()
  // comments: Comment[]; //les commentaires
}
