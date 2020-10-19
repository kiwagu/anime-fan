import { Anime } from '@anime.fan/declarations';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import {
  DELETE_ANIME_MUTATION,
  FETCH_ANIMES_QUERY,
} from '../../../graphql/index';

import './index.scss';

/* eslint-disable-next-line */
export interface DeleteButtonProps {
  animeId: string;
}

export const DeleteButton = ({ animeId }: DeleteButtonProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteAnime] = useMutation(DELETE_ANIME_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery<{ findAllAnimes: Anime[] }>({
        query: FETCH_ANIMES_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_ANIMES_QUERY,
        data: {
          findAllAnimes: data.findAllAnimes.filter((p) => p.id !== animeId),
        },
      });
    },
    variables: { id: animeId },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => deleteAnime()}
      />
    </>
  );
};

export default DeleteButton;
