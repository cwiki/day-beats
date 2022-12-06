<script setup lang="ts">
import type { Duration } from "moment";
import type { PropType } from "vue";
import TimeCompare from "@/components/TimeCompare.vue";

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
  <v-progress-linear model-value="20" />
  <div class="text-right">
    <TimeCompare :used="used" :available="available" />
  </div>
</template>

