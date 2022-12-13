import { defineStore } from "pinia";
import type { Change, ChangeType, Task } from "@/common/interfaces";
import { calculateTaskListDuration } from "@/common/helpers";
import { updateSegmentsWithIdentifiableHistory } from "@/common/UndoRedo";
import { useSegmentStore } from "@/stores/segment";

export const useTaskStore = defineStore("task", {
  state: () => {
    return {
      taskState: <Array<Task>>[],
      changes: <Array<Array<Change>>>[],
      undone: <Array<Array<Change>>>[],
    };
  },
  getters: {
    tasks(state): Array<Task> {
      return updateSegmentsWithIdentifiableHistory<Task>(
        state.taskState,
        state.changes
      );
    },
    taskIndexes() {
      const segments = useSegmentStore();
      const tasks: Array<Task> = [];
      segments.segments.forEach((segment) => {
        this.tasks.forEach((task) => {
          if (segment.id === task.segmentId) {
            tasks.push(task);
          }
        });
      });
      // add any tasks without a segment
      this.tasks.forEach((task) => {
        if (!task.segmentId) tasks.push(task);
      });
      const accum = new Map();
      for (const index in tasks) {
        const id = tasks[index].id;
        accum.set(id.toString(), Number(index) + 1);
      }
      return accum;
    },
    allocatedTime(): number {
      return calculateTaskListDuration(this.tasks);
    },
    allocatedTimeDone(): number {
      return calculateTaskListDuration(this.tasks.filter((task) => task.done));
    },
  },
  actions: {
    undo() {
      const undoneChange = this.changes.pop();
      if (undoneChange !== undefined) this.undone.push(undoneChange);
    },
    redo() {
      const undoneChange = this.undone.pop();
      if (undoneChange !== undefined) this.changes.push(undoneChange);
    },
    setTaskState(taskState: Array<Task>) {
      this.taskState = taskState;
    },
    addChanges(action: ChangeType, ...tasks: Array<Task>) {
      this.undone = [];
      // immediately perform task merge
      const changes = tasks.map((entity) => ({ action, entity }));
      this.changes.push(changes);
    },
  },
});
