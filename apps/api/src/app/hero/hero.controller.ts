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

import { CreateHeroDTO } from './dto/create-hero.dto';
import { UpdateHeroDTO } from './dto/update-hero.dto';
import { Hero } from './hero.entity';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  async create(@Body() createHeroDto: CreateHeroDTO): Promise<Hero> {
    const hero = new Hero();

    hero.name = createHeroDto.name;
    hero.description = createHeroDto?.description;
    hero.age = createHeroDto?.age;
    hero.gender = createHeroDto?.gender;

    try {
      return await this.heroService.create(hero);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHeroDto: UpdateHeroDTO
  ): Promise<UpdateResult> {
    const existingHero = await this.heroService.findById(id);

    if (!existingHero) {
      throw new NotFoundException();
    }

    const hero = new Hero();

    hero.id = existingHero.id;
    hero.name = updateHeroDto?.name || existingHero.name;
    hero.description =
      updateHeroDto?.description || existingHero.description;
    hero.age = updateHeroDto?.age || existingHero.age;
    hero.gender = updateHeroDto?.gender || existingHero.gender;

    try {
      return await this.heroService.update(hero);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get()
  async findAll(): Promise<Hero[]> {
    return await this.heroService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Hero> {
    const foundHero = await this.heroService.findById(id);
    if (foundHero) return foundHero;

    throw new NotFoundException();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.heroService.remove(id);
  }

  @Delete()
  removeAll(): void {
    this.heroService.removeAll();
  }
}
