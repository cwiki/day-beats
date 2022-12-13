<script setup lang="ts">
import { computed } from "vue";
import { defineProps } from "vue";
import { durationToHHmm } from "@/common/formatters";
import { getFormFieldTextColor } from "@/common/helpers";
import { useTheme } from "vuetify";

const theme = useTheme();
const props = defineProps({
  description: {
    type: String,
    default: "",
  },
  duration: {
    type: Number,
    default: 0,
  },
});

const durationLabel = computed(() => {
  if (props.duration) return "Duration " + durationToHHmm(props.duration);
  return "Duration in Minutes";
});
</script>

<template>
  <v-card density="compact" variant="outlined" color="primary">
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            :modelValue="description"
            @update:modelValue="$emit('update:description', $event)"
            :class="getFormFieldTextColor(theme)"
            variant="plain"
            density="compact"
            label="Add Task (Required)"
            autofocus
            hide-details
          />
        </v-col>
        <v-col cols="4" sm="4" md="2">
          <v-text-field
            :modelValue="duration"
            @update:modelValue="
              $emit('update:duration', $event ? Number($event) : 0)
            "
            :class="getFormFieldTextColor(theme)"
            type="number"
            variant="plain"
            density="compact"
            :label="durationLabel"
            hide-details
            hint="Minutes"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
