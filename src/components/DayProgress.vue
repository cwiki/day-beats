<script setup lang="ts">
import TimeCompare from "@/components/TimeCompare.vue";

defineProps({
  used: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
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

