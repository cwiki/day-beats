import type { Segment } from "@/common/interfaces";
import { v4 as uuidV4 } from "uuid";

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
