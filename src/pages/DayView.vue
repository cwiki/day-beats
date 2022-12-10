<script setup lang="ts">
import DayProgress from "@/components/DayProgress.vue";
import NewTaskBarForm from "@/components/NewTaskBarForm.vue";
import { useTaskStore } from "@/stores/task";
import { computed, onBeforeUnmount } from "vue";
import SegmentSingle from "@/components/SegmentSingle.vue";
import { getDefaultSegments } from "@/common/helpers";

const start = 30;
const finish = 4 * 60;

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
        <DayProgress :used="start" :available="finish" />
      </v-col>
    </v-row>
    <h1 class="screen-reader-text">Task List</h1>
    <SegmentSingle
      class="mt-8"
      v-for="segment in segments"
      :model-value="segment"
    />
    <v-btn class="screen-reader-text" @click="taskStore.undo()">undo</v-btn>
    <v-btn class="screen-reader-text" @click="taskStore.redo()">redo</v-btn>
  </v-container>
</template>
