import { UTCDate } from '@date-fns/utc';
import { DEFAULT_EVENT_GLYPH, type TimeSenseEventGlyph } from './icons';

export interface ITimeSenseEvent {
  createdOn: UTCDate;
  details?: string;
  icon: TimeSenseEventGlyph;
  id: number;
  name: string;
  triggerHistory: UTCDate[];
}

export class TimeSenseEvent implements ITimeSenseEvent {
  public createdOn: UTCDate;
  public details?: string | undefined;
  public icon: TimeSenseEventGlyph;
  public id: number;
  public name: string;
  public triggerHistory: UTCDate[];

  constructor(tsEvent: Partial<TimeSenseEvent> & { name: string }) {
    this.name = tsEvent.name;

    this.id = tsEvent.id ?? 0;
    this.createdOn = tsEvent.createdOn ?? new UTCDate();
    this.triggerHistory = tsEvent.triggerHistory ?? [];
    this.icon = tsEvent.icon ?? DEFAULT_EVENT_GLYPH;
    this.details = tsEvent.details;
  }
}
