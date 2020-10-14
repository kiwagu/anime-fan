import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Hero } from './hero.entity';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero)
    private heroRepository: Repository<Hero>
  ) {}

  create(hero: Hero): Promise<Hero> {
    return this.heroRepository.save(hero);
  }

  update(hero: Hero): Promise<UpdateResult> {
    return this.heroRepository.update(hero.id, hero);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.heroRepository.delete(id);
  }

  findAll(): Promise<Hero[]> {
    return this.heroRepository.find({ relations: ['anime'] });
  }

  findById(id: string): Promise<Hero> {
    return this.heroRepository.findOne({ relations: ['anime'], where: { id } });
  }

  findByName(name: string): Promise<Hero[]> {
    return this.heroRepository.find({ relations: ['anime'], where: { name } });
  }

  remove(id: string): Promise<DeleteResult> {
    return this.heroRepository.delete({ id });
  }

  removeAll(): Promise<void> {
    return this.heroRepository.clear();
  }
}
