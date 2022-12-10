export interface Task {
  id: String;
  description: String;
  duration?: Number; // in minutes
  done?: Boolean;
  segmentId?: String;
  order?: Number; // should be cleared when segment changed, rewrite order to integers; 0 = unordered
}

// Describes a users define segment of the day
export interface Segment {
  id: String;
  description: String;
  startTime: String; // Sorting based on start time
  endTime: String;
}
