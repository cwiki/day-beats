export interface Identifiable {
  id: String;
  description: String;
}

export interface Task extends Identifiable {
  duration?: number; // in minutes
  startTime?: number;
  done?: Boolean;
  segmentId?: String;
  order?: number; // should be cleared when segment changed, rewrite order to integers; 0 = unordered
}

// Describes a users define segment of the day
export interface Segment extends Identifiable {
  startTime: number;
  endTime: number;
}

export type ChangeType = "INSERT" | "UPDATE" | "DELETE";

export interface TaskChange {
  action: ChangeType;
  task: Task;
}

export interface Change {
  action: ChangeType;
  entity: Identifiable;
}
