import React from 'react';
import { Card, Label } from 'semantic-ui-react';

import { Anime } from '@anime.fan/declarations';

import './index.scss';

/* eslint-disable-next-line */
export interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard = ({
  anime: { name, description, score, year },
}: AnimeCardProps) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Label basic color="teal">
          Score
        </Label>
        <Label basic color="teal" pointing="left">
          {score || '-'}
        </Label>
        <Label basic color="teal">
          Year
        </Label>
        <Label basic color="teal" pointing="left">
          {year || '-'}
        </Label>
      </Card.Content>
    </Card>
  );
};

export default AnimeCard;
