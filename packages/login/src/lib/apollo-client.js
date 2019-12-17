import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { GQL_URL } from "./constant";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: GQL_URL
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
});

export default apolloClient;
