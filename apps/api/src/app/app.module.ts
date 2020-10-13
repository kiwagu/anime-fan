import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './hero/hero.module';
import { AnimeModule } from './anime/anime.module';

@Module({
  imports: [HeroModule, AnimeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
