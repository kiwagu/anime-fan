import { Test, TestingModule } from '@nestjs/testing';
import { AnimeResolver } from './anime.resolver';

describe('AnimeResolver', () => {
  let resolver: AnimeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimeResolver],
    }).compile();

    resolver = module.get<AnimeResolver>(AnimeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
