import VueApollo from "vue-apollo";

declare module "vue/types/vue" {
  interface Vue {
    $apolloProvider: VueApollo;
  }
}
