import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Anime as AnimeAbstract } from '@anime.fan/declarations';

@Entity()
@Unique(['name'])
export class Anime implements AnimeAbstract {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  score?: number;

  @Column({ nullable: true })
  year?: number;
}
