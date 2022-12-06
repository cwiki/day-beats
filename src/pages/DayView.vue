<script setup lang="ts">
import DualTime from "@/components/DualTime.vue";
import { duration } from "moment";

const start = duration(30, "minutes");
const finish = duration(4, "hours");
</script>

<template>
  <v-container>
    <v-row class="pt-8">
      <v-col cols="12">
        <v-card density="compact" variant="outlined" color="primary">
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  class="text-black"
                  variant="plain"
                  density="compact"
                  label="Add Task (press /)"
                  hide-details
                />
              </v-col>
              <v-col cols="4" sm="4" md="2">
                <v-text-field
                  class="text-black"
                  variant="plain"
                  density="compact"
                  label="Duration"
                  hide-details
                  hint="Minutes"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="px-8">
      <v-col>
        <v-progress-linear model-value="20" />
        <div class="text-right">
          <DualTime :used="start" :available="finish" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
