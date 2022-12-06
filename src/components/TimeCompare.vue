<script setup lang="ts">
import type { Duration } from "moment";
import type { PropType } from "vue";
import { durationToHHmm } from "@/common/formatters";

defineProps({
  used: {
    type: Object as PropType<Duration>,
    required: true,
  },
  available: {
    type: Object as PropType<Duration>,
    required: true,
  },
});
</script>

<template>
  <strong>{{ durationToHHmm(used) }} /</strong> {{ durationToHHmm(available) }}
</template>
