import type { Task } from "@/common/interfaces";

export function durationToHHmm(minutes: number): string {
  return new Date(minutes * 60 * 1000).toISOString().substring(11, 16);
}

function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  const d = new Date();
  d.setHours(hours, mins);
  const dateString = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [time, tod] = dateString.split(" ");
  return [time, tod.toLowerCase()];
}

export function formatTimeRange(start: number, end: number): string {
  const startArr = minutesToTime(start);
  const endArr = minutesToTime(end);
  if (startArr[1] === endArr[1]) {
    startArr.pop();
  }
  return `${startArr.join("")} - ${endArr.join("")}`;
}

export function formatTime(time: number): string {
  return minutesToTime(time).join("");
}

export function getTaskStartTimeText(task: Task): string {
  if (typeof task.startTime !== "number") return "";
  if (task.duration) {
    return formatTimeRange(task.startTime, task.startTime + task.duration);
  } else {
    return formatTime(task.startTime);
  }
}
