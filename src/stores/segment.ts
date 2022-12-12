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
    segments: function (state): Array<Segment> {
      const segs = updateSegmentsWithIdentifiableHistory<Segment>(
        state.segmentState,
        state.changes
      );
      segs.sort((segA, segB) => segA.startTime - segB.startTime);
      return segs;
    },
    currentSegment(): Segment | null {
      // get the matching segment for current time or first segment
      // todo refactor code
      let seg: Segment | null = null
      let segVariance = 0
      if (this.segments.length) {
        const date = new Date();
        const time = date.getHours() * 60 + date.getMinutes();

        // default to 0 else find closest time
        seg = this.segments[0]
        segVariance = Math.abs(time - this.segments[0].startTime)
        for (const segment of this.segments) {
          const thisVariance = Math.abs(time - segment.startTime)

          if (time >= segment.startTime && segment.endTime > time) {
            return segment;
          } else if (time >= segment.startTime && thisVariance < segVariance) {
            seg = segment
          }
        }
      }
      return seg;
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
      const changes: Array<Change> = segments.map((entity) => ({
        action,
        entity,
      }));
      this.changes.push(changes);
    },
  },
});
