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

export const DELETE_ANIME_MUTATION = gql`
  mutation deleteAnime($id: ID!) {
    deleteAnime(id: $id)
  }
`;

export const DELETE_ALL_ANIME_MUTATION = gql`
  mutation deleteAllAnimes {
    deleteAllAnimes
  }
`;
