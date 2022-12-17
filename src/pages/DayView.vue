<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { useTaskStore } from "@/stores/task";
import { useSegmentStore } from "@/stores/segment";
import DayProgress from "@/components/DayProgress.vue";
import SegmentSingle from "@/components/SegmentSingle.vue";
import EditTaskDialog from "@/components/EditTaskDialog.vue";
import TaskList from "@/components/TaskList.vue";

const taskStore = useTaskStore();
const segmentStore = useSegmentStore();
const segments = segmentStore.segments;
const newTaskDialog = ref(false);

document.addEventListener("keyup", keyupHandler);
function keyupHandler(event: { ctrlKey: any; key: string }) {
  switch (event.key) {
    case "/":
      newTaskDialog.value = true;
      break;
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
    <!--Segmented Tasks-->
    <SegmentSingle
      class="mt-8 px-12"
      v-for="segment in segments"
      :key="segment.id.toString()"
      :model-value="segment"
    />
    <!--Unassigned Tasks-->
    <div v-show="taskStore.unassignedTasks.length" class="mt-8">
      <v-row>
        <v-col class="pl-4 mx-8 mt-4">
          <TaskList v-model="taskStore.unassignedTasks" />
        </v-col>
      </v-row>
    </div>
    <v-btn class="screen-reader-text" @click="taskStore.undo()">undo</v-btn>
    <v-btn class="screen-reader-text" @click="taskStore.redo()">redo</v-btn>
  </v-container>
  <v-tooltip text="Add a New task (press /)">
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
