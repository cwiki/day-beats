<script setup lang="ts">
import { defineProps, defineEmits, watch, ref, type PropType } from "vue";
import { getFormFieldTextColor } from "@/common/helpers";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Object as PropType<Number | null>,
    default: null,
  },
});

const startTimeToggle = ref(false);
const startTimeField = ref("");

watch(
  () => props.modelValue,
  (value: Number | null) => {
    if (typeof value === "number") {
      startTimeToggle.value = true;
      const hours = Math.floor(value / 60)
        .toString()
        .padStart(2, "0");
      const minutes = (value % 60).toString().padStart(2, "0");
      minutes.toString().padStart(2, "0");
      startTimeField.value = `${hours}:${minutes}`;
    } else {
      startTimeToggle.value = false;
      startTimeField.value = "";
    }
  },
  { immediate: true }
);

// clear start time field any time the toggle is switched to false
watch(startTimeToggle, (value) => {
  if (!value) startTimeField.value = "";
});

watch(startTimeField, (value) => {
  let newValue = null;
  if (value && value.includes(":")) {
    // converter string to value
    const [hours, minutes] = value.split(":");
    newValue = Number(hours) * 60 + Number(minutes);
  }
  emits("update:modelValue", newValue);
});
</script>

<template>
  <v-switch v-model="startTimeToggle" label="Use a Start Time" />
  <v-fade-transition>
    <v-card
      v-show="startTimeToggle"
      density="compact"
      variant="outlined"
      color="primary"
    >
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              v-model="startTimeField"
              :class="getFormFieldTextColor()"
              variant="plain"
              type="time"
              density="compact"
              label="Start Time"
              hide-details
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-fade-transition>
</template>
