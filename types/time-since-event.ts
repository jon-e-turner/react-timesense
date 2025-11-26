export type TimeSinceEvent = {
  icon?: string;
  id: string;
  lastTriggered?: Date;
  name: string;
  triggerCount: number;
  triggerHistory: Date[];
};
