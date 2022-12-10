<script setup lang="ts">
import { Task } from "@/common/interfaces";
import { ref, type PropType } from "vue";
import TaskListItem from "@/components/TaskListItem.vue";

defineProps({
  modelValue: {
    type: Object as PropType<Array<Task>>,
    required: true,
  },
});

let selectedItem = ref(null);
</script>

<template>
  <v-list v-model="selectedItem">
    <template v-for="(task, index) in modelValue" :key="index">
      <TaskListItem :index="String(index + 1)" :modelValue="task" />
      <v-divider />
    </template>
  </v-list>
</template>
