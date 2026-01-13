import { UTCDate } from '@date-fns/utc';
import type { HistoryTag } from './history-tag';
import { type TimeSenseEventGlyph } from './icons';

export interface ITimeSenseEvent {
  [index: string]: any;
  details?: string;
  icon: TimeSenseEventGlyph;
  id: number;
  name: string;
  triggerHistory: {
    timestamp: UTCDate;
    tags: HistoryTag[];
  }[];
}
