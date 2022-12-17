<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/task";
import { useTheme } from "vuetify";

const taskStore = useTaskStore();
const route = useRoute();
const theme = useTheme();

function toggleTheme() {
  if (theme.global.name.value === "beatLight") {
    theme.global.name.value = "beatDark";
  } else {
    theme.global.name.value = "beatLight";
  }
}

function clearTasks() {
  const toDelete = taskStore.tasks.filter((task) => !task.recurring);
  const toReset = taskStore.tasks.map((task) => {
    task.done = false;
    return task;
  });

  if (toDelete) taskStore.addChanges("DELETE", ...toDelete);
  if (toReset) taskStore.addChanges("UPDATE", ...toReset);
}

const showUndoRedo = computed(() => route.name === "Beats");
const drawer = ref(false);
</script>

<template>
  <v-app-bar color="primary" density="compact">
    <v-toolbar-title> Day Beats </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-btn
        v-if="showUndoRedo"
        color="red"
        @click="clearTasks"
        :disabled="!taskStore.tasks.length"
      >
        <v-icon size="x-large">mdi-layers-off</v-icon>
        <v-tooltip activator="parent" location="bottom">
          Clear Tasks (Repeating will Reset)
        </v-tooltip>
      </v-btn>
      <v-btn
        v-if="showUndoRedo"
        :class="{ 'text-grey': !taskStore.changes.length }"
        @click="taskStore.undo()"
      >
        <v-icon size="x-large">mdi-undo-variant</v-icon>
        <v-tooltip activator="parent" location="bottom">Undo</v-tooltip>
      </v-btn>
      <v-btn
        v-if="showUndoRedo"
        :class="{ 'text-grey': !taskStore.undone.length }"
        @click="taskStore.redo()"
      >
        <v-icon size="x-large">mdi-redo-variant</v-icon>
        <v-tooltip activator="parent" location="bottom">Redo</v-tooltip>
      </v-btn>
      <!--      <v-btn @click="toggleTheme">-->
      <!--        <v-icon size="x-large">mdi-theme-light-dark</v-icon>-->
      <!--        <v-tooltip activator="parent" location="bottom">-->
      <!--          Toggle Dark Mode-->
      <!--        </v-tooltip>-->
      <!--      </v-btn>-->
      <v-btn @click="drawer = !drawer">
        <v-icon size="x-large">mdi-menu-open</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="right" absolute temporary>
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-list-status" title="Task List" to="/" />
      <v-list-item prepend-icon="mdi-cog-outline" title="Config" to="config" />
    </v-list>
    <template v-slot:append>
      <v-divider />
      <v-list-item
        prepend-icon="mdi-theme-light-dark"
        title="Toggle Dark Mode"
        @click="toggleTheme"
      />
      <!--      <v-list-item-->
      <!--        lines="two"-->
      <!--        prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"-->
      <!--        title="Jane Smith"-->
      <!--        subtitle="Logged in"-->
      <!--      ></v-list-item>-->
    </template>
  </v-navigation-drawer>
</template>
