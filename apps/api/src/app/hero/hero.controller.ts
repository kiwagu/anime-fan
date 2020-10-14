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

import { CreateHeroDTO } from './dto/create-hero.dto';
import { UpdateHeroDTO } from './dto/update-hero.dto';
import { Hero } from './hero.entity';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDTO): Hero {
    if (!createHeroDto.name) {
      throw new HttpException('Parameter Name must be defined', 400);
    }
    if (this.heroService.findByName(createHeroDto.name)) {
      throw new HttpException(`Hero ${createHeroDto.name} already exist`, 400);
    }

    return this.heroService.create(createHeroDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDTO): Hero {
    const heroById = this.heroService.findById(id);
    const heroByName = this.heroService.findByName(updateHeroDto?.name);

    if (
      updateHeroDto?.name &&
      heroByName?.id &&
      heroById?.id &&
      heroByName.id !== heroById.id &&
      heroByName?.name === updateHeroDto.name
    ) {
      throw new HttpException(`Hero ${updateHeroDto.name} already exist`, 400);
    }

    const updatedHero = this.heroService.update(id, updateHeroDto);
    if (updatedHero) return updatedHero;

    throw new NotFoundException();
  }

  @Get()
  findAll(): Hero[] {
    return this.heroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Hero {
    const foundHero = this.heroService.findById(id);
    if (foundHero) return foundHero;

    throw new NotFoundException();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Hero {
    const removedHero = this.heroService.remove(id);
    if (removedHero) return removedHero;

    throw new NotFoundException();
  }

  @Delete()
  removeAll(): void {
    this.heroService.removeAll();
  }
}
