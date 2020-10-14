import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnimeController } from './anime.controller';
import { Anime } from './anime.entity';
import { AnimeService } from './anime.service';

@Module({
  imports: [TypeOrmModule.forFeature([Anime])],
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
