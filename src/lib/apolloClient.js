// lib/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://mrecettes.infinityfreeapp.com/graphql',
  cache: new InMemoryCache(),
});




export default client;
