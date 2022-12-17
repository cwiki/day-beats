<script setup lang="ts">
import { defineProps, ref } from "vue";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const snackbar = ref(true)
</script>

<template>
  <v-snackbar v-model="snackbar">
    {{ modelValue }}
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
