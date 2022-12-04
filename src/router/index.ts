import { createRouter, createWebHistory } from "vue-router";
import DayView from "../pages/DayView.vue";
import BeatConfig from "../pages/BeatConfigView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Beats",
      component: DayView,
    },
    {
      path: "/config",
      name: "Config",
      component: BeatConfig,
    },
    {
      path: "/settings",
      name: "Settings",
      component: () => import("../pages/SettingsView.vue"),
    },
  ],
});

export default router;
