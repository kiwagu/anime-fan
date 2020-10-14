import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Anime } from './anime.entity';
import { AnimeService } from './anime.service';
import { CreateAnimeDTO } from './dto/create-anime.dto';
import { UpdateAnimeDTO } from './dto/update-anime.dto';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post()
  create(@Body() createAnimeDto: CreateAnimeDTO): Anime {
    if (!createAnimeDto.name) {
      throw new HttpException('Parameter Name must be defined', 400);
    }
    if (this.animeService.findByName(createAnimeDto.name)) {
      throw new HttpException(
        `Anime ${createAnimeDto.name} already exist`,
        400
      );
    }

    return this.animeService.create(createAnimeDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnimeDto: UpdateAnimeDTO
  ): Anime {
    const animeById = this.animeService.findById(id);
    const animeByName = this.animeService.findByName(updateAnimeDto?.name);

    if (
      updateAnimeDto?.name &&
      animeByName?.id &&
      animeById?.id &&
      animeByName.id !== animeById.id &&
      animeByName?.name === updateAnimeDto.name
    ) {
      throw new HttpException(
        `Anime ${updateAnimeDto.name} already exist`,
        400
      );
    }

    const updatedAnime = this.animeService.update(id, updateAnimeDto);
    if (updatedAnime) return updatedAnime;

    throw new NotFoundException();
  }

  @Get()
  findAll(): Anime[] {
    return this.animeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Anime {
    const foundAnime = this.animeService.findById(id);
    if (foundAnime) return foundAnime;

    throw new NotFoundException();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Anime {
    const removedAnime = this.animeService.remove(id);
    if (removedAnime) return removedAnime;

    throw new NotFoundException();
  }

  @Delete()
  removeAll(): void {
    this.animeService.removeAll();
  }
}
