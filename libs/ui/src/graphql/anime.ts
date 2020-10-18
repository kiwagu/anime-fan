import gql from 'graphql-tag';

export const FETCH_ANIMES_QUERY = gql`
  {
    findAllAnimes {
      id
      name
      description
      score
      year
    }
  }
`;

export const CREATE_ANIME_MUTATION = gql`
  mutation createAnime($createAnimeDTO: CreateAnimeDTO!) {
    createAnime(createAnimeInput: $createAnimeDTO) {
      id
      name
      description
      score
      year
    }
  }
`;
