<script setup lang="ts">
import { watch } from "vue";
import { RouterView } from "vue-router";
import MyAppToolbar from "@/components/MyAppToolbar.vue";
import { getDefaultSegments } from "@/common/helpers";
import { useTaskStore } from "@/stores/task";
import { useSegmentStore } from "@/stores/segment";

const taskStore = useTaskStore();
const segmentStore = useSegmentStore();
const segments = getDefaultSegments();

const tasks = window.localStorage.getItem("DAY_BEAT_TASKS")
if (tasks) taskStore.setTaskState(JSON.parse(tasks))
const segs = window.localStorage.getItem("DAY_BEAT_SEGMENTS")
if (segs) segmentStore.setSegmentState(JSON.parse(segs))
// init the segments if there are none
if (!segmentStore.segments.length) {
  segmentStore.addChanges("INSERT", ...segments);
}

watch(
  () => taskStore.tasks,
  (tasks) => {
    window.localStorage.setItem("DAY_BEAT_TASKS", JSON.stringify(tasks));
    console.log("DAY_BEAT_TASKS", "saved");
  }
);

watch(
  () => segmentStore.segments,
  (segments) => {
    window.localStorage.setItem("DAY_BEAT_SEGMENTS", JSON.stringify(segments));
    console.log("DAY_BEAT_SEGMENTS", "saved");
  }
);

</script>

<template>
  <v-app>
    <header>
      <MyAppToolbar />
    </header>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
