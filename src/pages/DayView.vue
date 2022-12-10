<script setup lang="ts">
import moment from "moment";
import DayProgress from "@/components/DayProgress.vue";
import TaskList from "@/components/TaskList.vue";
import NewTaskBarForm from "@/components/NewTaskBarForm.vue";
import { useTaskStore } from "@/stores/task";
import TimeCompare from "@/components/TimeCompare.vue";
import { onBeforeUnmount } from "vue";

const start = moment.duration(30, "minutes");
const finish = moment.duration(4, "hours");

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

onBeforeUnmount(() => {
  document.removeEventListener("keyup", keyupHandler);
});
</script>

<template>
  <v-container>
    <v-row class="pt-8">
      <v-col cols="12">
        <NewTaskBarForm />
      </v-col>
    </v-row>
    <v-row class="px-8">
      <v-col>
        <DayProgress :used="start" :available="finish" />
      </v-col>
    </v-row>
    <h1 class="screen-reader-text">Task List</h1>
    <div>
      <v-row>
        <v-col>
          <h2 class="text-sm-body-2">Early Morning 6am - 8am</h2>
        </v-col>
        <v-col class="text-right">
          <TimeCompare :used="start" :available="finish" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="px-8">
          <TaskList v-model="taskStore.tasks" />
        </v-col>
      </v-row>
    </div>
    <v-btn class="screen-reader-text" @click="taskStore.undo()">undo</v-btn>
    <v-btn class="screen-reader-text" @click="taskStore.redo()">redo</v-btn>
  </v-container>
</template>
