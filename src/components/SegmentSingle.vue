<script setup lang="ts">
import TaskList from "@/components/TaskList.vue";
import TimeCompare from "@/components/TimeCompare.vue";
import { computed, defineProps, type PropType } from "vue";
import type { Segment } from "@/common/interfaces";
import { formatTimeRange } from "@/common/formatters";
import { useTaskStore } from "@/stores/task";
import { useSegmentStore } from "@/stores/segment";
import { calculateTaskListDuration } from "@/common/helpers";

const props = defineProps({
  modelValue: {
    type: Object as PropType<Segment>,
    required: true,
  },
});
const taskStore = useTaskStore();
const segmentStore = useSegmentStore();

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
const isCurrentSegment = computed(() => {
  if (!segmentStore.currentSegment) return null;
  return props.modelValue.id === segmentStore.currentSegment.id;
});
</script>

<template>
  <v-sheet>
    <v-row>
      <v-col>
        <h2 class="text-sm-body-2">
          <strong>
            <v-btn
              :color="isCurrentSegment ? 'primary' : ''"
              :class="{ activeSegment: isCurrentSegment }"
              :icon="isCurrentSegment ? 'mdi-circle' : 'mdi-circle-outline'"
              variant="text"
              class="pb-1"
              flat
              size="x-small"
              @click="segmentStore.setSegment(modelValue)"
            />
            <span
              @click="segmentStore.setSegment(modelValue)"
              class="mr-1"
              :class="{ 'text-primary': isCurrentSegment }"
            >
              {{ modelValue.description }}
            </span>
            {{ formatTimeRange(modelValue.startTime, modelValue.endTime) }}
          </strong>
        </h2>
      </v-col>
      <v-col class="text-right">
        <TimeCompare :used="used" :available="available" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pl-4">
        <TaskList v-model="segmentTasks" />
      </v-col>
    </v-row>
  </v-sheet>
</template>
