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
  // image: Image; //le contenu de l'image

  // @Column()
  // likes: User[]; //les utilisateurs qui ont liké

  // @Column()
  // comments: Comment[]; //les commentaires
}
