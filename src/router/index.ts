import { createRouter, createWebHistory } from "vue-router";
import DayView from "../pages/DayView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Beats",
      component: DayView,
    },
  ],
});

export default router;
