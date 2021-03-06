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
import { DeleteResult, UpdateResult } from 'typeorm';

import type { CreateAnimeDTO, UpdateAnimeDTO } from '@anime.fan/declarations';

import { Anime } from './anime.entity';
import { AnimeService } from './anime.service';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post()
  async create(@Body() createAnimeDto: CreateAnimeDTO): Promise<Anime> {
    const anime = new Anime();

    anime.name = createAnimeDto.name;
    anime.description = createAnimeDto?.description;
    anime.score = createAnimeDto?.score;
    anime.year = createAnimeDto?.year;

    try {
      return await this.animeService.create(anime);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAnimeDto: UpdateAnimeDTO
  ): Promise<UpdateResult> {
    const existingAnime = await this.animeService.findById(id);

    if (!existingAnime) {
      throw new NotFoundException();
    }

    const anime = new Anime();

    anime.id = existingAnime.id;
    anime.name = updateAnimeDto?.name || existingAnime.name;
    anime.description =
      updateAnimeDto?.description || existingAnime.description;
    anime.score = updateAnimeDto?.score || existingAnime.score;
    anime.year = updateAnimeDto?.year || existingAnime.year;

    try {
      return await this.animeService.update(anime);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get()
  async findAll(): Promise<Anime[]> {
    return await this.animeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Anime> {
    const foundAnime = await this.animeService.findById(id);
    if (foundAnime) return foundAnime;

    throw new NotFoundException();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    try {
      return await this.animeService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Delete()
  async removeAll(): Promise<void> {
    try {
      await this.animeService.removeAll();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
