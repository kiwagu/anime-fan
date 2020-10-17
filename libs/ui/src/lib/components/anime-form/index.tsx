import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

import { CreateAnimeDTO } from '@anime.fan/declarations';

import './index.scss';

/* eslint-disable-next-line */
export interface AnimeFormProps {}

export const AnimeForm = (props: AnimeFormProps) => {
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
  );
};

export default AnimeForm;
