<script setup lang="ts">
import { Task } from "@/common/interfaces";
import { ref, type PropType } from "vue";
import TaskListItem from "@/components/TaskListItem.vue";
import { useTaskStore } from "@/stores/task";
import EditTaskDialog from "@/components/EditTaskDialog.vue";

const taskStore = useTaskStore();

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
  <EditTaskDialog v-model:modelValue="dialog" :task="task" />
</template>
