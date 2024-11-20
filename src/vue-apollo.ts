import Vue from "vue";
import VueApollo from "vue-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { GRAPHQL_URL } from "../config";

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export function createProvider() {
  return new VueApollo({
    defaultClient: apolloClient,
  });
}
