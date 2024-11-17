import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ViewOne from "../views/ViewOne.vue";
import ViewTwo from "../views/ViewTwo.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/view-one",
    name: "view-one",
    component: ViewOne,
  },
  {
    path: "/view-two",
    name: "view-two",
    component: ViewTwo,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
