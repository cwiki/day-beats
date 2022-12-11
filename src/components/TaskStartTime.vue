<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { Task } from "@/common/interfaces";
import { getTaskStartTimeText } from "@/common/formatters";

const props = defineProps({
  modelValue: {
    type: Object as PropType<Task>,
    required: true,
  },
});
const text = computed(() => {
  const t = getTaskStartTimeText(props.modelValue);
  return t ? "@" + t : "";
});
</script>
<template>
  <span style="color: #ff4f39">
    <strong>{{ text }}</strong>
  </span>
</template>
