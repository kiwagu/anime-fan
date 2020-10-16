import { ApolloClient, InMemoryCache } from '@apollo/client';

import { environment } from '../environments/environment';

export const apolloClient = new ApolloClient({
  uri: environment.GRAPHQL_SERVER_URL,
  cache: new InMemoryCache(),
});
