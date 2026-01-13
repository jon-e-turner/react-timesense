import type { HistoryTag } from '@/types/history-tag';
import { type TimeSenseEventGlyph, DEFAULT_EVENT_GLYPH } from '@/types/icons';
import type { ITimeSenseEvent } from '@/types/time-sense-event';
import type { UTCDate } from '@date-fns/utc';

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
