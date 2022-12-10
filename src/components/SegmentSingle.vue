<script setup lang="ts">
import TaskList from "@/components/TaskList.vue";
import TimeCompare from "@/components/TimeCompare.vue";
import { computed, defineProps, PropType } from "vue";
import type { Segment } from "@/common/interfaces";
import { formatTimeRange } from "@/common/formatters";
import { useTaskStore } from "@/stores/task";
import { calculateTaskListDuration } from "@/common/helpers";

const props = defineProps({
  modelValue: {
    type: Object as PropType<Segment>,
    required: true,
  },
});
const taskStore = useTaskStore();

const segmentTasks = computed(() => {
  return taskStore.tasks.filter(
    (task) => task.segmentId === props.modelValue.id
  );
});

const used = computed(() => {
  return calculateTaskListDuration(segmentTasks.value);
});

const available = computed(() => {
  return props.modelValue.endTime - props.modelValue.startTime;
});
// used = number of hours total in tasks
// available = number of hours in segment diff between dates
</script>

<template>
  <div>
    <v-row>
      <v-col>
        <h2 class="text-sm-body-2">
          {{ modelValue.description }}
          {{ formatTimeRange(modelValue.startTime, modelValue.endTime) }}
        </h2>
      </v-col>
      <v-col class="text-right">
        <TimeCompare :used="used" :available="available" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="px-8">
        <TaskList v-model="segmentTasks" />
      </v-col>
    </v-row>
  </div>
</template>
