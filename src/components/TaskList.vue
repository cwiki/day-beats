<script setup lang="ts">
import type { Task } from "@/common/interfaces";
import { ref, type PropType } from "vue";
import TaskListItem from "@/components/TaskListItem.vue";
import EditTaskDialog from "@/components/EditTaskDialog.vue";

defineProps({
  modelValue: {
    type: Object as PropType<Array<Task>>,
    required: true,
  },
});

let dialog = ref(false);
let task = ref<Task | null>(null);
function editTask(t: Task) {
  task.value = t;
  dialog.value = true;
}
</script>

<template>
  <v-list>
    <template v-for="(task, index) in modelValue" :key="index">
      <TaskListItem
        @click="editTask(task)"
        :index="String(index + 1)"
        :modelValue="task"
      />
      <v-divider />
    </template>
  </v-list>
  <EditTaskDialog v-if="task" v-model:modelValue="dialog" :task="task" />
</template>
