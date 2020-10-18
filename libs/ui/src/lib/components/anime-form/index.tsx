import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form } from 'semantic-ui-react';

import { CreateAnimeDTO } from '@anime.fan/declarations';

import './index.scss';
import { CREATE_ANIME_MUTATION } from '../../../graphql/anime';

/* eslint-disable-next-line */
export interface AnimeFormProps {}

export const AnimeForm = (props: AnimeFormProps) => {
  const createAnimeDTO: CreateAnimeDTO = {
    name: '',
  };
  const [values, setValues] = useState(createAnimeDTO);
  const [createAnime, { error }] = useMutation(CREATE_ANIME_MUTATION, {
    variables: {
      createAnimeDTO: values,
    },
    update(proxy, result) {
      values.name = '';
      values.description = '';
      values.score = 0;
      values.year = 0;
    },
  });
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: Number(event.target.value) || event.target.value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    createAnime();
    window.location.href = '/';
  };

  return (
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
          value={Number(values.score) || ''}
        />
        <Form.Input
          placeholder="Year"
          name="year"
          onChange={onChange}
          value={Number(values.year) || ''}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

export default AnimeForm;
