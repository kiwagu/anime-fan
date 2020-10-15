import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Anime } from './anime.entity';
import { AnimeService } from './anime.service';
import { CreateAnimeDTO } from './dto/create-anime.dto';
import { UpdateAnimeDTO } from './dto/update-anime.dto';

@Resolver()
export class AnimeResolver {
  constructor(private readonly animeService: AnimeService) {}

  @Query()
  async findAll(): Promise<Anime[]> {
    return await this.animeService.findAll();
  }

  @Query()
  async findOne(@Args('id') id: string): Promise<Anime> {
    return await this.animeService.findById(id);
  }

  @Mutation()
  async create(
    @Args('createAnimeInput') createAnimeDTO: CreateAnimeDTO
  ): Promise<Anime> {
    const anime = new Anime();

    anime.name = createAnimeDTO.name;
    anime.description = createAnimeDTO?.description;
    anime.score = createAnimeDTO?.score;
    anime.year = createAnimeDTO?.year;

    return await this.animeService.create(anime);
  }

  @Mutation()
  async update(
    @Args('id') id: string,
    @Args('updateAnimeInput') updateAnimeDTO: UpdateAnimeDTO
  ): Promise<Anime> {
    const existingAnime = await this.animeService.findById(id);

    if (!existingAnime) {
      throw new NotFoundException(`User ${id} not found`);
    }

    const anime = new Anime();

    anime.id = existingAnime.id;
    anime.name = updateAnimeDTO?.name || existingAnime.name;
    anime.description =
      updateAnimeDTO?.description || existingAnime.description;
    anime.score = updateAnimeDTO?.score || existingAnime.score;
    anime.year = updateAnimeDTO?.year || existingAnime.year;

    await this.animeService.update(anime);

    return anime;
  }

  @Mutation()
  async delete(@Args('id') id: string): Promise<boolean> {
    await this.animeService.remove(id);

    return true;
  }

  @Mutation()
  async deleteAll(): Promise<boolean> {
    await this.animeService.removeAll();

    return true;
  }
}
