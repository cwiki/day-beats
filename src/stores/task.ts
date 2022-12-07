import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Task } from "@/common/interfaces";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref<Array<Task>>([]);
  // const doubleCount = computed(() => count.value * 2);
  function addTask(task: Task) {
    tasks.value.push(task);
  }

  return { tasks, addTask };
});
