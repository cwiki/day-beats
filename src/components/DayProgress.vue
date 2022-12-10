<script setup lang="ts">
import { computed } from "vue";
import TimeCompare from "@/components/TimeCompare.vue";
import { useTaskStore } from "@/stores/task";
const taskStore = useTaskStore();

const percentDone = computed(() => {
  if (taskStore.allocatedTime === 0) return 0;
  return (taskStore.allocatedTimeDone / taskStore.allocatedTime) * 100;
});
</script>

<template>
  <v-progress-linear :model-value="percentDone" />
  <div class="text-right">
    <TimeCompare
      :used="taskStore.allocatedTimeDone"
      :available="taskStore.allocatedTime"
    />
  </div>
</template>
