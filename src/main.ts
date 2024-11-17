import Vue from "vue";
import MainApp from "./MainApp.vue";
import router from "./router";
import "./styles/global.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(MainApp),
}).$mount("#app");
