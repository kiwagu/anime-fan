import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { Hero } from './hero.entity';
import { AnimeService } from '../anime/anime.service';
import { Anime } from '../anime/anime.entity';
import { HeroResolver } from './hero.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hero]),
    TypeOrmModule.forFeature([Anime]),
  ],
  providers: [HeroService, AnimeService, HeroResolver],
  controllers: [HeroController],
})
export class HeroModule {}
