import type { TimeSenseEventGlyph } from './icons';

export type TimeSenseEvent = {
  createdOn: Date;
  icon?: TimeSenseEventGlyph;
  id: string;
  name: string;
  triggerHistory: Date[];
};
