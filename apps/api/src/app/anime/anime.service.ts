import { Injectable } from '@nestjs/common';

import { Anime } from './anime.entity';
import { CreateAnimeDTO } from './dto/create-anime.dto';
import { UpdateAnimeDTO } from './dto/update-anime.dto';

const animes: Anime[] = [
  { id: '1', name: 'Fullmetal Alchemist: Brotherhood', score: 9.2, year: 2009 },
  { id: '2', name: 'The Ghost in the Shell', score: 8.3, year: 1995 },
];

@Injectable()
export class AnimeService {
  private lastUserIndex = Number(animes[animes.length - 1].id) + 1;

  create(createAnimeDto: CreateAnimeDTO): Anime {
    const anime = new Anime();
    anime.id = String(this.lastUserIndex++);
    anime.name = createAnimeDto.name;
    anime.description = createAnimeDto?.description;
    anime.score = createAnimeDto?.score;
    anime.year = createAnimeDto?.year;

    animes.push(anime);

    return anime;
  }

  update(id: string, updateAnimeDto: UpdateAnimeDTO): Anime {
    const animeId = animes.findIndex((anime) => anime.id === id);

    if (animeId > 0) {
      animes[animeId].name = updateAnimeDto?.name || animes[animeId].name;
      animes[animeId].description =
        updateAnimeDto?.description || animes[animeId]?.description;
      animes[animeId].score = updateAnimeDto?.score || animes[animeId]?.score;
      animes[animeId].year = updateAnimeDto?.year || animes[animeId]?.year;

      return animes[animeId];
    }

    return null;
  }

  findAll(): Anime[] {
    return animes;
  }

  findById(id: string): Anime {
    return animes.find((anime) => anime.id === id);
  }

  findByName(name: string): Anime {
    if (!name) return null;
    return animes.find((anime) => anime.name === name);
  }

  remove(id: string): Anime {
    const animesIndexToDelete = animes.indexOf(
      animes.find((anime) => anime.id === id)
    );
    if (animesIndexToDelete === -1) return null;

    const removedanimees = animes.splice(animesIndexToDelete, 1);

    return removedanimees.length ? removedanimees[0] : null;
  }

  removeAll() {
    animes.splice(0, animes.length);
  }
}
