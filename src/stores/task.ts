import { defineStore } from "pinia";
import type { Change, ChangeType, Task } from "@/common/interfaces";
import { calculateTaskListDuration } from "@/common/helpers";
import { updateSegmentsWithIdentifiableHistory } from "@/common/UndoRedo";

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
    addChanges(action: ChangeType, ...tasks: Array<Task>) {
      this.undone = [];
      // immediately perform task merge
      const changes = tasks.map((entity) => ({ action, entity }));
      this.changes.push(changes);
    },
  },
});
