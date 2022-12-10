<script setup lang="ts">
import { Task } from "@/common/interfaces";
import { type PropType, computed, type ComputedRef } from "vue";
import { durationToHHmm } from "@/common/formatters";
import moment from "moment";
import { useTaskStore } from "@/stores/task";

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
});

function fmtDur(input: number): String {
  return durationToHHmm(moment.duration(input, "minutes"));
}

function toggleTaskDone() {
  const clone = Object.assign({}, props.modelValue);
  clone.done = !clone.done;
  taskStore.addChanges("UPDATE", clone);
}
</script>

<template>
  <v-list-item>
    <v-list-item-title>
      <span class="mr-4">{{ index }}</span>
      <span v-if="!modelValue.done">{{ modelValue.description }}</span>
      <del v-else>{{ modelValue.description }}</del>
    </v-list-item-title>
    <template v-slot:append>
      {{ fmtDur(modelValue.duration) }}
      <v-btn class="ml-4" size="medium" @click="toggleTaskDone" icon>
        <v-icon v-if="modelValue.done" class="text-green-lighten-1">
          mdi-checkbox-marked-outline
        </v-icon>
        <v-icon v-else> mdi-checkbox-blank-outline </v-icon>
      </v-btn>
    </template>
  </v-list-item>
</template>
