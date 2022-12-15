<script setup lang="ts">
import type { Task } from "@/common/interfaces";
import type { PropType } from "vue";
import { durationToHHmm } from "@/common/formatters";
import { useTaskStore } from "@/stores/task";
import TaskStartTime from "@/components/TaskStartTime.vue";

const taskStore = useTaskStore();
const props = defineProps({
  modelValue: {
    type: Object as PropType<Task>,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

function fmtDur(input: number): String {
  return durationToHHmm(input);
}

function toggleTaskDone() {
  if (props.readonly) return;
  const clone = Object.assign({}, props.modelValue);
  clone.done = !clone.done;
  taskStore.addChanges("UPDATE", clone);
}

function toggleRecurring() {
  if (props.readonly) return;
  const clone = Object.assign({}, props.modelValue);
  console.log(clone)
  clone.recurring = !clone.recurring;
  taskStore.addChanges("UPDATE", clone);
}
</script>

<template>
  <v-list-item @click="$emit('click')">
    <template v-slot:prepend>
      <span class="mr-4">{{ taskStore.taskIndexes.get(modelValue.id) }}</span>
    </template>
    <template v-slot:title>
      <span v-if="!modelValue.done">{{ modelValue.description }}</span>
      <del v-else>{{ modelValue.description }}</del>
    </template>
    <template v-if="modelValue.startTime" v-slot:subtitle>
      <TaskStartTime :modelValue="modelValue" />
    </template>
    <template v-slot:append>
      <span>
        {{ fmtDur(modelValue.duration || 0) }}
      </span>
      <v-btn class="ml-2" variant="flat" @click.stop="toggleRecurring">
        <v-icon :color="modelValue.recurring ? 'green' : ''"> mdi-refresh </v-icon>
        <v-tooltip activator="parent" location="bottom"> Recurring </v-tooltip>
      </v-btn>
      <v-btn
        variant="flat"
        @click.stop="toggleTaskDone"
        icon
        size="small"
      >
        <v-icon v-if="modelValue.done" class="text-green-lighten-1">
          mdi-checkbox-marked-outline
        </v-icon>
        <v-icon v-else> mdi-checkbox-blank-outline </v-icon>
      </v-btn>
    </template>
  </v-list-item>
</template>
