import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Button, Form, Grid } from 'semantic-ui-react';

import { AnimeCard } from '@anime.fan/ui';
import { CreateAnimeDTO } from '@anime.fan/declarations';

import './index.scss';

/* eslint-disable-next-line */
export interface HomeProps {}

export const Home = (props: HomeProps) => {
  const { loading, data: { findAllAnimes: animes } = {} } = useQuery(
    FETCH_ANIMES_QUERY
  );
  const createAnimeDTO: CreateAnimeDTO = {
    name: '',
  };
  const [values, setValues] = useState(createAnimeDTO);
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Animes</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ marginBottom: 20 }}>
          <Form onSubmit={onSubmit}>
            <h2>Create an anime:</h2>
            <Form.Field>
              <Form.Input
                placeholder="Name"
                name="name"
                onChange={onChange}
                value={values.name}
              />
              <Form.TextArea
                placeholder="Description"
                name="description"
                onChange={onChange}
                value={values.description}
              />
              <Form.Input
                placeholder="Score"
                name="score"
                onChange={onChange}
                value={values.score}
              />
              <Form.Input
                placeholder="Year"
                name="year"
                onChange={onChange}
                value={values.year}
              />
              <Button type="submit" color="teal">
                Submit
              </Button>
            </Form.Field>
          </Form>
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

const FETCH_ANIMES_QUERY = gql`
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

export default Home;
