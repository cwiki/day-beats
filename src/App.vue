<script setup lang="ts">
import { RouterView } from "vue-router";
import MyAppToolbar from "@/components/MyAppToolbar.vue";
import { getDefaultSegments } from "@/common/helpers";
import { useSegmentStore } from "@/stores/segment";

const segmentStore = useSegmentStore();
const segments = getDefaultSegments();

// init the segments if there are none
if (!segmentStore.segments.length) {
  segmentStore.addChanges("INSERT", ...segments)
}
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
