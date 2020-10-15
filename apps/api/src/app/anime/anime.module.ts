import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnimeController } from './anime.controller';
import { Anime } from './anime.entity';
import { AnimeService } from './anime.service';
import { AnimeResolver } from './anime.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Anime])],
  controllers: [AnimeController],
  providers: [AnimeService, AnimeResolver],
})
export class AnimeModule {}
