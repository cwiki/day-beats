<script setup lang="ts">
import DayProgress from "@/components/DayProgress.vue";
import NewTaskBarForm from "@/components/NewTaskBarForm.vue";
import { useTaskStore } from "@/stores/task";
import { computed, onBeforeUnmount } from "vue";
import { Segment } from "@/common/interfaces";
import { v4 as uuidV4 } from "uuid";
import SegmentSingle from "@/components/SegmentSingle.vue";

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

const morning: Segment = {
  id: uuidV4(),
  description: "Morning",
  startTime: 60 * 6,
  endTime: 60 * 8,
};

const currentSegment = computed(() => {
  return morning;
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
    <SegmentSingle v-model="morning" />
    <v-btn class="screen-reader-text" @click="taskStore.undo()">undo</v-btn>
    <v-btn class="screen-reader-text" @click="taskStore.redo()">redo</v-btn>
  </v-container>
</template>
