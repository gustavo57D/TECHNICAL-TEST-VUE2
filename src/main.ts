import Vue from "vue";
import MainApp from "./MainApp.vue";
import router from "./router";
import { createProvider } from "./vue-apollo";
import "./styles/global.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider: createProvider(),
  render: (h) => h(MainApp),
}).$mount("#app");
