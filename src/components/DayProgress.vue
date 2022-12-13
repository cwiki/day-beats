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
  <v-progress-linear
    rounded
    color="secondary"
    :model-value="percentDone"
    height="14"
  >
    <span class="text-sm-caption text-black">
      <TimeCompare
        :used="taskStore.allocatedTimeDone"
        :available="taskStore.allocatedTime"
      />
    </span>
  </v-progress-linear>
  <div class="text-right"></div>
</template>
