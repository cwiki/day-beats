export interface Task {
  id: String;
  description: String;
  duration?: number; // in minutes
  done?: Boolean;
  segmentId?: String;
  order?: number; // should be cleared when segment changed, rewrite order to integers; 0 = unordered
}

// Describes a users define segment of the day
export interface Segment {
  id: String;
  description: String;
  startTime: number;
  endTime: number;
}
