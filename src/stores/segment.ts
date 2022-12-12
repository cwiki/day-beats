import { defineStore } from "pinia";
import type { ChangeType, Segment, Change } from "@/common/interfaces";
import { updateSegmentsWithIdentifiableHistory } from "@/common/UndoRedo";

export const useSegmentStore = defineStore("segment", {
  state: () => {
    return {
      segmentState: <Array<Segment>>[],
      changes: <Array<Array<Change>>>[],
      undone: <Array<Array<Change>>>[],
    };
  },
  getters: {
    segments(state): Array<Segment> {
      return updateSegmentsWithIdentifiableHistory<Segment>(
        state.segmentState,
        state.changes
      );
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
    addChanges(action: ChangeType, ...segments: Array<Segment>) {
      this.undone = [];
      // immediately perform segment merge
      const changes: Array<Change> = segments.map((entity) => ({ action, entity }));
      this.changes.push(changes);
    },
  },
});
