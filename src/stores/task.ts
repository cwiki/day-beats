import { defineStore } from "pinia";
import type { Task } from "@/common/interfaces";
import { calculateTaskListDuration } from "@/common/helpers";

type ChangeType = "INSERT" | "UPDATE" | "DELETE";

interface TaskChange {
  action: ChangeType;
  task: Task;
}

/**
 * Applies array of changes to a task list
 * @param tasks
 * @param changeSet
 */
function applyTaskChangesToTasks(
  tasks: Array<Task>,
  changeSet: Array<TaskChange>
): Array<Task> {
  for (const change of changeSet) {
    const index = tasks.findIndex((t: Task) => change.task.id === t.id);

    switch (change.action) {
      case "INSERT":
        tasks.push(change.task);
        break;
      case "UPDATE":
        if (index !== -1) tasks[index] = change.task;
        break;
      case "DELETE":
        if (index !== -1) tasks.splice(index, 1);
    }
  }

  return tasks;
}

/**
 * Can apply the MATRIX of TaskChanges to a Tasks list
 * @param base
 * @param changes
 */
function updateTasksWithTaskChangeHistory(
  base: Array<Task>,
  changes: Array<Array<TaskChange>>
): Array<Task> {
  let clone = JSON.parse(JSON.stringify(base)); // fresh copy so base state is not tampered with
  for (const changeSet of changes) {
    clone = applyTaskChangesToTasks(clone, changeSet);
  }
  return clone;
}

export const useTaskStore = defineStore("task", {
  state: () => {
    return {
      taskState: <Array<Task>>[],
      changes: <Array<Array<TaskChange>>>[],
      undone: <Array<Array<TaskChange>>>[],
    };
  },
  getters: {
    tasks(state): Array<Task> {
      return updateTasksWithTaskChangeHistory(state.taskState, state.changes);
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
      const changes = tasks.map((task) => ({ action, task }));
      this.changes.push(changes);
    },
  },
});
