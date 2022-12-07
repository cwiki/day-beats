<script setup lang="ts">
import { Task } from "@/common/interfaces";
import type { PropType } from "vue";
import { durationToHHmm } from "@/common/formatters";
import moment from "moment";
defineProps({
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
</script>

<template>
  <v-list-item>
    <v-list-item-title>
      <span class="mr-4">{{ index }}</span> {{ modelValue.description }}
    </v-list-item-title>
    <template v-slot:append>
      {{ fmtDur(modelValue.duration) }}
    </template>
  </v-list-item>
</template>
