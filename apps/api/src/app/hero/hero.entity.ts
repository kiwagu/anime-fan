import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Anime } from '../anime/anime.entity';

@Entity()
@Unique(['name'])
export class Hero {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ nullable: true })
  gender?: 'male' | 'female' | 'other';

  @ManyToOne(() => Anime)
  anime?: Anime;
}
