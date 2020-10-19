import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import {
  DELETE_ALL_ANIME_MUTATION,
  FETCH_ANIMES_QUERY,
} from '../../../graphql';

import './index.scss';

/* eslint-disable-next-line */
export interface DeleteAllButtonProps {}

export const DeleteAllButton = (props: DeleteAllButtonProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteAllAnime] = useMutation(DELETE_ALL_ANIME_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      proxy.writeQuery({
        query: FETCH_ANIMES_QUERY,
        data: {
          findAllAnimes: null,
        },
      });
    },
  });

    return (
      <>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" />
          Delete all animes
        </Button>
        <Confirm
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => deleteAllAnime()}
        />
      </>
    );
};

export default DeleteAllButton;
