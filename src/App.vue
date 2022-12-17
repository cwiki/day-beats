<script setup lang="ts">
import { watch } from "vue";
import { RouterView } from "vue-router";
import MyAppToolbar from "@/components/MyAppToolbar.vue";
import { getDefaultSegments } from "@/common/helpers";
import { useTaskStore } from "@/stores/task";
import { useSegmentStore } from "@/stores/segment";
import { useTheme } from "vuetify";
import { CACHE_NAME, type Cache } from "@/common/interfaces";

const taskStore = useTaskStore();
const segmentStore = useSegmentStore();
const segments = getDefaultSegments();
const theme = useTheme();

function updateCache() {
  const cache: Cache = {
    theme: theme.global.name.value,
    tasks: taskStore.tasks,
    segments: segmentStore.segments,
  };
  window.localStorage.setItem(CACHE_NAME, JSON.stringify(cache));
  console.log("DBS_CACHE", "updated");
}

function loadCache(cacheJson: string) {
  const cache: Cache = JSON.parse(cacheJson);
  theme.global.name.value = cache.theme.toString();
  taskStore.setTaskState(cache.tasks);
  segmentStore.setSegmentState(cache.segments);
}

const cache = window.localStorage.getItem(CACHE_NAME);
if (cache) loadCache(cache);
else segmentStore.addChanges("INSERT", ...segments);

watch(() => taskStore.tasks, updateCache);
watch(() => segmentStore.segments, updateCache);
watch(() => theme.global.name.value, updateCache);
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
