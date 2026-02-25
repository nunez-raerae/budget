import { create } from "zustand";

type TimeFrameState = {
  timeFrame: string;
  updateTimeFrame: (newTimeFrame: string) => void;
};

export const useTimeFrame = create<TimeFrameState>((set) => ({
  timeFrame: "Day",
  updateTimeFrame: (newTimeFrame) => set({ timeFrame: newTimeFrame }),
}));
