import { UTCDate } from '@date-fns/utc';
import type { HistoryTag } from './history-tag';
import { DEFAULT_EVENT_GLYPH, type TimeSenseEventGlyph } from './icons';

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

export class TimeSenseEvent implements ITimeSenseEvent {
  public details?: string | undefined;
  public icon: TimeSenseEventGlyph;
  public id: number;
  public name: string;
  public triggerHistory: {
    timestamp: UTCDate;
    tags: HistoryTag[];
  }[];

  constructor(tsEvent: Partial<TimeSenseEvent> & { name: string }) {
    this.name = tsEvent.name;
    this.id = tsEvent.id ?? 0;
    this.triggerHistory = tsEvent.triggerHistory ?? [];
    this.icon = tsEvent.icon ?? DEFAULT_EVENT_GLYPH;
    this.details = tsEvent.details;
  }
}
