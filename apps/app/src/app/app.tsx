import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../utils/apollo-client';

import './app.scss';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  </ApolloProvider>
);

export default App;
