<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import { useTaskStore } from "@/stores/task";
import { useSegmentStore } from "@/stores/segment";
import NewTaskBarForm from "@/components/NewTaskBarForm.vue";
import DayProgress from "@/components/DayProgress.vue";
import SegmentSingle from "@/components/SegmentSingle.vue";

const taskStore = useTaskStore();
const segmentStore = useSegmentStore();

document.addEventListener("keyup", keyupHandler);
function keyupHandler(event: { ctrlKey: any; key: string }) {
  if (event.ctrlKey) {
    switch (event.key) {
      case "z":
        taskStore.undo();
        break;
      case "Z":
        taskStore.redo();
        break;
    }
  }
}

const segments = segmentStore.segments;

onBeforeUnmount(() => {
  document.removeEventListener("keyup", keyupHandler);
});
</script>

<template>
  <v-container>
    <v-row class="pt-8">
      <v-col cols="12">
        <NewTaskBarForm v-if=segmentStore.currentSegment :segment="segmentStore.currentSegment" />
        <div v-else>Segment is required</div>
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
      :key="segment.id.toString()"
      :model-value="segment"
    />
    <v-btn class="screen-reader-text" @click="taskStore.undo()">undo</v-btn>
    <v-btn class="screen-reader-text" @click="taskStore.redo()">redo</v-btn>
  </v-container>
</template>
