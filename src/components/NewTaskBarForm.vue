<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from "vuetify";
import { useTaskStore } from "@/stores/task";
import { v4 as uuidV4 } from "uuid";
import { defineProps, onBeforeUnmount, PropType, ref } from "vue";
import { type Segment } from "@/common/interfaces";
import { durationToHHmm } from "@/common/formatters";

const props = defineProps({
  segment: {
    type: Object as PropType<Segment>,
    required: true,
  },
});

const theme = useTheme();
const textColor =
  theme.global.name.value === "dark" ? "text-white" : "text-black";

const task = ref("");
const duration = ref(0);
const xyz = ref(null);

const taskStore = useTaskStore();

function addTask() {
  (function (task: String, duration: number) {
    if (task === "") return;
    taskStore.addChanges("INSERT", {
      id: uuidV4(),
      description: task,
      duration: Number(duration),
      segmentId: props.segment.id,
    });
  })(task.value, duration.value);
  task.value = "";
  duration.value = 0;
}

document.addEventListener("keyup", keyupHandler);
function keyupHandler(event: { ctrlKey: any; key: string }) {}

const durationLabel = computed(() => {
  if (duration.value) return "Duration " + durationToHHmm(duration.value);
  return "Duration in Minutes";
});

onBeforeUnmount(() => {
  document.removeEventListener("keyup", keyupHandler);
});
</script>

<template>
  <v-form @submit.prevent="addTask">
    <v-card density="compact" variant="outlined" color="primary">
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              ref="xyz"
              v-model="task"
              :class="textColor"
              variant="plain"
              density="compact"
              label="Add Task (Required)"
              autofocus
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
              :label="durationLabel"
              hide-details
              hint="Minutes"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <button type="submit" class="screen-reader-text">add</button>
  </v-form>
</template>
