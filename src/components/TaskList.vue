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

</script>

<template>
  <v-list>
    <template v-for="(task, index) in modelValue" :key="index">
      <TaskListItem :index="String(index + 1)" :modelValue="task" />
      <v-divider />
    </template>
  </v-list>
</template>
