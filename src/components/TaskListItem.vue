<script setup lang="ts">
import { Task } from "@/common/interfaces";
import { type PropType } from "vue";
import { durationToHHmm } from "@/common/formatters";
import { useTaskStore } from "@/stores/task";
import TaskStartTime from "@/components/TaskStartTime.vue";

const taskStore = useTaskStore();
const props = defineProps({
  index: {
    type: String,
    default: "?",
    required: false,
  },
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
</script>

<template>
  <v-list-item @click="$emit('click')">
    <template v-slot:title>
      <span class="mr-4">{{ index }}</span>
      <span v-if="!modelValue.done">{{ modelValue.description }}</span>
      <del v-else>{{ modelValue.description }}</del>
    </template>
    <template v-slot:subtitle>
      <TaskStartTime class="ml-1" :modelValue="modelValue" />
    </template>
    <template v-slot:append>
      {{ fmtDur(modelValue.duration) }}
      <v-btn class="ml-4" variant="flat" @click.stop="toggleTaskDone" icon>
        <v-icon v-if="modelValue.done" class="text-green-lighten-1">
          mdi-checkbox-marked-outline
        </v-icon>
        <v-icon v-else> mdi-checkbox-blank-outline </v-icon>
      </v-btn>
    </template>
  </v-list-item>
</template>
