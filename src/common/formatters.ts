import moment, { type Duration } from "moment";

export function durationToHHmm(d: Duration): string {
  return moment.utc(d.asMilliseconds()).format("HH:mm");
}
