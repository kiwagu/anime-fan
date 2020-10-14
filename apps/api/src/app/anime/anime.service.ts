import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Anime } from './anime.entity';

@Injectable()
export class AnimeService {
  constructor(
    @InjectRepository(Anime)
    private animeRepository: Repository<Anime>
  ) {}

  create(anime: Anime): Promise<Anime> {
    return this.animeRepository.save(anime);
  }

  update(anime: Anime): Promise<UpdateResult> {
    return this.animeRepository.update(anime.id, anime);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.animeRepository.delete(id);
  }

  findAll(): Promise<Anime[]> {
    return this.animeRepository.find();
  }

  findById(id: string): Promise<Anime> {
    return this.animeRepository.findOne(id);
  }

  findByName(name: string): Promise<Anime[]> {
    return this.animeRepository.find({ name });
  }

  remove(id: string): Promise<DeleteResult> {
    return this.animeRepository.delete({ id });
  }

  removeAll(): Promise<void> {
    return this.animeRepository.clear();
  }
}
