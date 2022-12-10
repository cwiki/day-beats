<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/task";
const taskStore = useTaskStore();
const route = useRoute();
const showUndoRedo = computed(() => route.name === "Beats");
</script>

<template>
  <v-app-bar color="primary" density="compact">
    <v-toolbar-title> Day Beats </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-btn
        v-if="showUndoRedo"
        @click="taskStore.undo()"
        :disabled="!taskStore.changes.length"
      >
        <v-icon size="x-large">mdi-undo-variant</v-icon>
        <v-tooltip activator="parent" location="bottom"> cmd + z </v-tooltip>
      </v-btn>
      <v-btn
        v-if="showUndoRedo"
        @click="taskStore.redo()"
        :disabled="!taskStore.undone.length"
      >
        <v-icon size="x-large">mdi-redo-variant</v-icon>
        <v-tooltip activator="parent" location="bottom"> cmd + y </v-tooltip>
      </v-btn>
      <v-btn to="/">
        <v-icon size="x-large">mdi-format-list-numbered</v-icon>
        <v-tooltip activator="parent" location="bottom">
          Task List / Home
        </v-tooltip>
      </v-btn>
      <v-btn to="/config">
        <v-icon size="x-large">mdi-format-list-bulleted-triangle</v-icon>
        <v-tooltip activator="parent" location="bottom"> Day Config </v-tooltip>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>
