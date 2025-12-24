import { DEFAULT_EVENT_GLYPH, type TimeSenseEventGlyph } from './icons';

export interface ITimeSenseEvent {
  createdOn: Date;
  details?: string;
  icon?: TimeSenseEventGlyph;
  id: string;
  name: string;
  triggerHistory: Date[];
}

export class TimeSenseEvent implements ITimeSenseEvent {
  public createdOn: Date;
  public details?: string | undefined;
  public icon?: TimeSenseEventGlyph | undefined;
  public id: string;
  public name: string;
  public triggerHistory: Date[];

  constructor(tsEvent: Partial<TimeSenseEvent> & { name: string }) {
    this.id = tsEvent.id ?? '';
    this.createdOn = tsEvent.createdOn ?? new Date();
    this.triggerHistory = tsEvent.triggerHistory ?? [];
    this.icon = tsEvent.icon ?? DEFAULT_EVENT_GLYPH;
    this.details = tsEvent.details;
    this.name = tsEvent.name;
  }
}
