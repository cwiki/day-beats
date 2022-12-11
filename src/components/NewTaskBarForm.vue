<script setup lang="ts">
import { defineProps, PropType, ref, computed } from "vue";
import { useTheme } from "vuetify";
import { v4 as uuidV4 } from "uuid";
import { useTaskStore } from "@/stores/task";
import { type Segment } from "@/common/interfaces";
import { durationToHHmm } from "@/common/formatters";
import TaskComboField from "@/components/fields/TaskComboField.vue";

const props = defineProps({
  segment: {
    type: Object as PropType<Segment>,
    required: true,
  },
});

const theme = useTheme();
const textColor =
  theme.global.name.value === "dark" ? "text-white" : "text-black";

const task = ref("");
const duration = ref(0);

const taskStore = useTaskStore();

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

const durationLabel = computed(() => {
  if (duration.value) return "Duration " + durationToHHmm(duration.value);
  return "Duration in Minutes";
});
</script>

<template>
  <v-form @submit.prevent="addTask">
    <TaskComboField v-model:description="task" v-model:duration="duration" />
    <button type="submit" class="screen-reader-text">add</button>
  </v-form>
</template>
