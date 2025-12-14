import type { TimeSinceEventGlyph } from './icons';

export type TimeSinceEvent = {
  createdOn: Date;
  icon?: TimeSinceEventGlyph;
  id: string;
  name: string;
  triggerHistory: Date[];
};
