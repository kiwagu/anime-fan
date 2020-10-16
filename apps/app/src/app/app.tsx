import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../utils/apollo-client';
import { Route, Switch } from 'react-router-dom';

import { Home, NotFound } from '@anime.fan/ui';

import './app.scss';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </ApolloProvider>
);

export default App;
