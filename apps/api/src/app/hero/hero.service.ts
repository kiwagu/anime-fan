import { Injectable } from '@nestjs/common';
import { CreateHeroDTO } from './dto/create-hero.dto';
import { UpdateHeroDTO } from './dto/update-hero.dto';
import { Hero } from './hero.entity';

const heroes: Hero[] = [
  { id: '1', name: 'Erlic', description: 'Main hero', age: 12, gender: 'male' },
  { id: '2', name: 'Mustang', age: 30 },
  { id: '3', name: 'Riza', gender: 'female' },
];

@Injectable()
export class HeroService {
  private lastUserIndex = Number(heroes[heroes.length - 1].id) + 1;

  create(createUserDto: CreateHeroDTO): Hero {
    const hero = new Hero();
    hero.id = String(this.lastUserIndex++);
    hero.name = createUserDto.name;
    hero.description = createUserDto?.description;
    hero.age = createUserDto?.age;
    hero.gender = createUserDto?.gender;

    heroes.push(hero);

    return hero;
  }

  update(id: string, updateUserDto: UpdateHeroDTO): Hero {
    const heroId = heroes.findIndex((hero) => hero.id === id);

    if (heroId > 0) {
      heroes[heroId].name = updateUserDto?.name || heroes[heroId].name;
      heroes[heroId].description =
        updateUserDto?.description || heroes[heroId]?.description;
      heroes[heroId].age = updateUserDto?.age || heroes[heroId]?.age;
      heroes[heroId].gender = updateUserDto?.gender || heroes[heroId]?.gender;

      return heroes[heroId];
    }

    return null;
  }

  findAll(): Hero[] {
    return heroes;
  }

  findById(id: string): Hero {
    return heroes.find((hero) => hero.id === id);
  }

  findByName(name: string): Hero {
    if (!name) return null;
    return heroes.find((hero) => hero.name === name);
  }

  remove(id: string): Hero {
    const herosIndexToDelete = heroes.indexOf(
      heroes.find((hero) => hero.id === id)
    );
    if (herosIndexToDelete === -1) return null;

    const removedHeroes = heroes.splice(herosIndexToDelete, 1);

    return removedHeroes.length ? removedHeroes[0] : null;
  }

  removeAll() {
    heroes.splice(0, heroes.length);
  }
}
