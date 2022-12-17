import { createRouter, createWebHistory } from "vue-router";
import DayView from "@/pages/DayView.vue";
import ConfigView from "@/pages/ConfigView.vue";

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
      component: ConfigView,
    },
  ],
});

export default router;
