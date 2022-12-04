<script setup lang="ts">
import { RouterView } from "vue-router";
import MyAppToolbar from "@/components/MyAppToolbar.vue";
</script>

<template>
  <header>
    <MyAppToolbar />
  </header>
  <RouterView />
</template>
