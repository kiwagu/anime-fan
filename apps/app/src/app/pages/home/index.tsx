import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import { AnimeCard, AnimeForm, FETCH_ANIMES_QUERY } from '@anime.fan/ui';

import './index.scss';

/* eslint-disable-next-line */
export interface HomeProps {}

export const Home = (props: HomeProps) => {
  const { loading, data: { findAllAnimes: animes } = {} } = useQuery(
    FETCH_ANIMES_QUERY
  );

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Animes</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ marginBottom: 20 }}>
          <AnimeForm />
        </Grid.Column>

        {loading ? (
          <h1>Loading animes..</h1>
        ) : (
          animes &&
          animes.map((anime) => (
            <Grid.Column key={anime.id} style={{ marginBottom: 20 }}>
              <AnimeCard anime={anime} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
