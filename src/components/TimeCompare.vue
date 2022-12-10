<script setup lang="ts">
import { computed } from "vue";
import { durationToHHmm } from "@/common/formatters";

const props = defineProps({
  used: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
});
const oa = computed(() => props.used > props.available);
</script>

<template>
  <strong :class="{ 'text-red': oa }">{{ durationToHHmm(used) }} /</strong
  >{{ durationToHHmm(available) }}
</template>
