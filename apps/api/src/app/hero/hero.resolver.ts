import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AnimeService } from '../anime/anime.service';

import type { CreateHeroDTO, UpdateHeroDTO } from '@anime.fan/declarations';

import { Hero } from './hero.entity';
import { HeroService } from './hero.service';

@Resolver()
export class HeroResolver {
  constructor(
    private readonly heroService: HeroService,
    private readonly animeService: AnimeService
  ) {}

  @Query('findAllHeroes')
  async findAll(): Promise<Hero[]> {
    return await this.heroService.findAll();
  }

  @Query('findOneHero')
  async findOne(@Args('id') id: string): Promise<Hero> {
    return await this.heroService.findById(id);
  }

  @Mutation('createHero')
  async create(
    @Args('createHeroInput') createHeroDTO: CreateHeroDTO
  ): Promise<Hero> {
    const hero = new Hero();

    await this.assignAnime(hero, createHeroDTO?.animeId);

    hero.name = createHeroDTO.name;
    hero.description = createHeroDTO?.description;
    hero.age = createHeroDTO?.age;
    hero.gender = createHeroDTO?.gender;

    return await this.heroService.create(hero);
  }

  @Mutation('updateHero')
  async update(
    @Args('id') id: string,
    @Args('updateHeroInput') updateHeroDTO: UpdateHeroDTO
  ): Promise<Hero> {
    const existingHero = await this.heroService.findById(id);

    if (!existingHero) {
      throw new NotFoundException(`User ${id} not found`);
    }

    const hero = new Hero();

    await this.assignAnime(hero, updateHeroDTO?.animeId);

    hero.id = existingHero.id;
    hero.name = updateHeroDTO?.name || existingHero.name;
    hero.description = updateHeroDTO?.description || existingHero.description;
    hero.age = updateHeroDTO?.age || existingHero.age;
    hero.gender = updateHeroDTO?.gender || existingHero.gender;

    await this.heroService.update(hero);

    return hero;
  }

  @Mutation('deleteHero')
  async delete(@Args('id') id: string): Promise<boolean> {
    await this.heroService.remove(id);

    return true;
  }

  @Mutation('deleteAllHeroes')
  async deleteAll(): Promise<boolean> {
    await this.heroService.removeAll();

    return true;
  }

  private assignAnime = async (hero: Hero, id: string) => {
    if (id) {
      const anime = await this.animeService.findById(id);
      if (!anime) {
        throw new NotFoundException(`Anime with id: ${id} not found`);
      }
      hero.anime = anime;
    }
  };
}
