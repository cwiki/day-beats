<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { useTaskStore } from "@/stores/task";
import { getDefaultSegments } from "@/common/helpers";
import NewTaskBarForm from "@/components/NewTaskBarForm.vue";
import DayProgress from "@/components/DayProgress.vue";
import SegmentSingle from "@/components/SegmentSingle.vue";

const taskStore = useTaskStore();
document.addEventListener("keyup", keyupHandler);
function keyupHandler(event: { ctrlKey: any; key: string }) {
  if (event.ctrlKey) {
    switch (event.key) {
      case "z":
        taskStore.undo();
        break;
      case "y":
        taskStore.redo();
        break;
    }
  }
}

const segments = getDefaultSegments();

const currentSegment = computed(() => {
  // get the matching segment for current time or first segment
  const date = new Date();
  const time = date.getHours() * 60 + date.getMinutes();
  for (const segment of segments) {
    if (time >= segment.startTime && segment.endTime > time) {
      return segment;
    }
  }
  return segments[0];
});

onBeforeUnmount(() => {
  document.removeEventListener("keyup", keyupHandler);
});
</script>

<template>
  <v-container>
    <v-row class="pt-8">
      <v-col cols="12">
        <NewTaskBarForm :segment="currentSegment" />
      </v-col>
    </v-row>
    <v-row class="px-8">
      <v-col>
        <DayProgress />
      </v-col>
    </v-row>
    <h1 class="screen-reader-text">Task List</h1>
    <SegmentSingle
      class="mt-8 px-12"
      v-for="segment in segments"
      :key="segment.id"
      :model-value="segment"
    />
    <v-btn class="screen-reader-text" @click="taskStore.undo()">undo</v-btn>
    <v-btn class="screen-reader-text" @click="taskStore.redo()">redo</v-btn>
  </v-container>
</template>
