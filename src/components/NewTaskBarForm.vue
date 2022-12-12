<script setup lang="ts">
import { defineProps, type PropType, ref } from "vue";
import { v4 as uuidV4 } from "uuid";
import { useTaskStore } from "@/stores/task";
import type { Segment } from "@/common/interfaces";
import TaskComboField from "@/components/fields/TaskComboField.vue";

const props = defineProps({
  segment: {
    type: Object as PropType<Segment>,
    required: true,
  },
});

const taskStore = useTaskStore();

const task = ref("");
const duration = ref(0);

function addTask() {
  (function (task: String, duration: number) {
    if (task === "") return;
    taskStore.addChanges("INSERT", {
      id: uuidV4(),
      description: task,
      duration: Number(duration),
      segmentId: props.segment.id,
    });
  })(task.value, duration.value);
  task.value = "";
  duration.value = 0;
}
</script>

<template>
  <v-form @submit.prevent="addTask">
    <TaskComboField v-model:description="task" v-model:duration="duration" />
    <button type="submit" class="screen-reader-text">add</button>
  </v-form>
</template>
