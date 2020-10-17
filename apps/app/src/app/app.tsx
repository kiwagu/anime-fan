import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../utils/apollo-client';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import { Home, NotFound } from './pages';

import './app.scss';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  </ApolloProvider>
);

export default App;
