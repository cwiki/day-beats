<script setup lang="ts">
import { ref } from "vue";
import { useTaskStore } from "@/stores/task";
import { useSegmentStore } from "@/stores/segment";
import { getDefaultSegments } from "@/common/helpers";
import MySnackbar from "@/components/MySnackbar.vue";

const taskStore = useTaskStore();
const segmentStore = useSegmentStore();

function resetSegments() {
  const segments = getDefaultSegments();
  segmentStore.deleteAllSegments();
  segmentStore.addChanges("INSERT", ...segments);
  messages.value.push("Segments Reset");
}
function clearData() {
  taskStore.deleteAllTasks();
  segmentStore.deleteAllSegments();
  window.localStorage.clear();
  messages.value.push("Data Cleared");
}

const messages = ref<Array<String>>([]);
</script>

<template>
  <v-container>
    <v-row>
      <v-col md="8" offset-md="2">
        <h1>App Config</h1>
        <v-card>
          <v-card-title> Restore Default Segments </v-card-title>
          <v-card-text>
            Preforming this action will reset the segments and disconnect all
            tasks.
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="resetSegments" variant="outlined" color="error">
              Reset
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-spacer class="my-8" />
        <v-card>
          <v-card-title> Clear App Data </v-card-title>
          <v-card-text> Clear all app data. </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="clearData" variant="outlined" color="error">
              Clear All
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <MySnackbar
      v-for="(message, index) in messages"
      :key="index"
      :model-value="message"
    />
  </v-container>
</template>
