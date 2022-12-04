<script setup lang="ts">
</script>

<template>
  <v-toolbar color="primary" density="compact">
    <v-toolbar-title> Day Beats </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-btn to="/">
        <v-icon size="x-large">mdi-format-list-numbered</v-icon>
        <v-tooltip
            activator="parent"
            location="bottom"
        >
          Task List / Home
        </v-tooltip>
      </v-btn>
      <v-btn to="/config">
        <v-icon size="x-large">mdi-format-list-bulleted-triangle</v-icon>
        <v-tooltip
            activator="parent"
            location="bottom"
        >
          Day Config
        </v-tooltip>
      </v-btn>
      <v-btn to="/settings">
        <v-icon size="x-large">mdi-cog</v-icon>
        <v-tooltip
            activator="parent"
            location="bottom"
        >
          Settings
        </v-tooltip>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
