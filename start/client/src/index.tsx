import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import injectStyles from './styles';

const cache = new InMemoryCache();
const link = new HttpLink({ uri: 'http://192.168.168.100:4000' });

const client = new ApolloClient({
  cache,
  link
});

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages></Pages>
  </ApolloProvider>,
  document.getElementById('root')
);
