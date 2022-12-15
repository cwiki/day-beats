<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { useTaskStore } from "@/stores/task";
import { useSegmentStore } from "@/stores/segment";
import DayProgress from "@/components/DayProgress.vue";
import SegmentSingle from "@/components/SegmentSingle.vue";
import EditTaskDialog from "@/components/EditTaskDialog.vue";

const taskStore = useTaskStore();
const segmentStore = useSegmentStore();
const segments = segmentStore.segments;
const newTaskDialog = ref(false);

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
      case "n":
        newTaskDialog.value = true;
        break;
    }
  }
}

onBeforeUnmount(() => {
  document.removeEventListener("keyup", keyupHandler);
});
</script>

<style scoped>
.my-fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>

<template>
  <v-container>
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
  <v-tooltip text="Ctrl + n">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        class="my-fab"
        fab
        icon="mdi-plus"
        color="primary"
        @click="newTaskDialog = !newTaskDialog"
      />
    </template>
  </v-tooltip>
  <EditTaskDialog v-model="newTaskDialog" />
</template>
