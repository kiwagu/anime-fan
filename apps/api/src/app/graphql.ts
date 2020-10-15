
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

export interface CreateAnimeDTO {
    name: string;
    description?: string;
    score?: number;
    year?: number;
}

export interface UpdateAnimeDTO {
    name?: string;
    description?: string;
    score?: number;
    year?: number;
}

export interface CreateHeroDTO {
    name: string;
    description?: string;
    age?: number;
    gender?: Gender;
    animeId?: string;
}

export interface UpdateHeroDTO {
    name?: string;
    description?: string;
    age?: number;
    gender?: Gender;
    animeId?: string;
}

export interface Anime {
    id: string;
    name: string;
    description?: string;
    score?: number;
    year?: number;
}

export interface IQuery {
    findAll(): Anime[] | Promise<Anime[]>;
    findOne(id: string): Anime | Promise<Anime>;
    findAllHeroes(): Hero[] | Promise<Hero[]>;
    findOneHero(id: string): Hero | Promise<Hero>;
}

export interface IMutation {
    create(createAnimeInput: CreateAnimeDTO): Anime | Promise<Anime>;
    update(id: string, updateAnimeInput: UpdateAnimeDTO): Anime | Promise<Anime>;
    delete(id: string): boolean | Promise<boolean>;
    deleteAll(): boolean | Promise<boolean>;
    createHero(createHeroInput: CreateHeroDTO): Hero | Promise<Hero>;
    updateHero(id: string, updateHeroInput: UpdateHeroDTO): Hero | Promise<Hero>;
    deleteHero(id: string): boolean | Promise<boolean>;
    deleteAllHeroes(): boolean | Promise<boolean>;
}

export interface Hero {
    id: string;
    name: string;
    description?: string;
    age?: number;
    gender?: Gender;
    anime?: Anime;
}
