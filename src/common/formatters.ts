import type {Task} from "@/common/interfaces";

export function durationToHHmm(minutes: number): string {
  return new Date(minutes * 60 * 1000).toISOString().substring(11, 16);
}

function minutesToTime(minutes: number) {
  // todo fixed this it's forked
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  const afternoon = hours >= 12;
  const tod = afternoon ? "pm" : "am";
  let time = String(afternoon ? hours - 12 : hours);
  if (mins > 0) {
    time += ":" + mins;
  }
  return [time, tod];
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
    return formatTimeRange(
        task.startTime,
        task.startTime + task.duration
    );
  } else {
    return formatTime(task.startTime)
  }
}
