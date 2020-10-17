import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Anime } from '../anime/anime.entity';

import { Gender, Hero as HeroAbstract } from '@anime.fan/declarations';

@Entity()
@Unique(['name'])
export class Hero implements HeroAbstract {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ nullable: true, enum: Gender })
  gender?: string;

  @ManyToOne(() => Anime)
  anime?: Anime;
}
