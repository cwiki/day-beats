<script setup lang="ts">
import type { PropType } from "vue";
import { Task } from "@/common/interfaces";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
});
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    fullscreen
    :scrim="false"
    transition="slide-x-transition"
  >
    <v-card>
      <v-toolbar density="compact" color="primary">
        <v-btn icon dark @click="$emit('update:modelValue', false)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Edit Task</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="text" @click="$emit('update:modelValue', false)"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      {{ task }}
    </v-card>
  </v-dialog>
</template>
