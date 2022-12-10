
export function durationToHHmm(minutes: number): string {
  return new Date(minutes * 60 * 1000).toISOString().substr(11, 5);
}
