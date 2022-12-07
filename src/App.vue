<script setup lang="ts">
import { RouterView } from "vue-router";
import MyAppToolbar from "@/components/MyAppToolbar.vue";

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
