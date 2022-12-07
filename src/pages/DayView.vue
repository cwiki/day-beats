<script setup lang="ts">
import moment from "moment";
import DayProgress from "@/components/DayProgress.vue";
import { useTheme } from "vuetify";
import { ref } from "vue";
import { useTaskStore } from "@/stores/task";
import TaskListItem from "@/components/TaskListItem.vue";

const start = moment.duration(30, "minutes");
const finish = moment.duration(4, "hours");

const theme = useTheme();
const textColor =
  theme.global.name.value === "dark" ? "text-white" : "text-black";

const task = ref("");
const duration = ref(0);

const taskStore = useTaskStore();

function addTask() {
  (function (task: String, duration: Number) {
    taskStore.addTask({
      description: task,
      duration: duration,
    });
  })(task.value, duration.value);
  task.value = "";
  duration.value = 0;
}
</script>

<template>
  <v-container>
    <v-row class="pt-8">
      <v-col cols="12">
        <v-form @submit.prevent="addTask">
          <v-card density="compact" variant="outlined" color="primary">
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="task"
                    :class="textColor"
                    variant="plain"
                    density="compact"
                    label="Add Task (press /)"
                    hide-details
                  />
                </v-col>
                <v-col cols="4" sm="4" md="2">
                  <v-text-field
                    v-model="duration"
                    :class="textColor"
                    type="number"
                    variant="plain"
                    density="compact"
                    label="Duration"
                    hide-details
                    hint="Minutes"
                  />
                  <v-btn type="submit"> add </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
    <v-row class="px-8">
      <v-col>
        <DayProgress :used="start" :available="finish" />
      </v-col>
    </v-row>
    <div>
      <v-list>
        <template v-for="(_, index) in taskStore.tasks" :key="index">
          <TaskListItem
            :index="String(index + 1)"
            v-model="taskStore.tasks[index]"
          />
        </template>
      </v-list>
    </div>
  </v-container>
</template>
