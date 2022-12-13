import type { Segment, Task } from "@/common/interfaces";
import { v4 as uuidV4 } from "uuid";
import type { ThemeInstance } from "vuetify";

export function getDefaultSegments(): Array<Segment> {
  return [
    {
      id: uuidV4(),
      description: "Early Morning",
      startTime: 60 * 4 + 30,
      endTime: 60 * 8,
    },
    {
      id: uuidV4(),
      description: "Morning",
      startTime: 60 * 8,
      endTime: 60 * 12, // Noon
    },
    {
      id: uuidV4(),
      description: "Afternoon",
      startTime: 60 * 12,
      endTime: 60 * 16, // 4pm
    },
    {
      id: uuidV4(),
      description: "Evening",
      startTime: 60 * 16,
      endTime: 60 * 20, // 8pm
    },
    {
      id: uuidV4(),
      description: "Late Evening",
      startTime: 60 * 20,
      endTime: 60 * 20 + 30, // 8:30,
    },
  ];
}
export function calculateTaskListDuration(tasks: Array<Task>): number {
  return tasks.reduce(
    (carry, task) => (task.duration ? Number(carry) + task.duration : carry),
    0
  );
}

export function getFormFieldTextColor(theme: ThemeInstance) {
  switch (theme.global.name.value) {
    case "beatDark":
      return "text-white";
    case "beatLight":
    default:
      return "text-black";
  }
}
