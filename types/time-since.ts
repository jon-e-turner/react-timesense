import { UTCDate } from '@date-fns/utc';
import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInYears,
} from 'date-fns';

export interface ITimeSince {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  refreshInterval: number;
}

export class TimeSince implements ITimeSince {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  refreshInterval: number;

  constructor(currentTime: UTCDate, lastTrigger: UTCDate) {
    this.years = differenceInYears(currentTime, lastTrigger);
    this.days =
      differenceInCalendarDays(currentTime, lastTrigger) -
      differenceInCalendarDays(
        new UTCDate(`${currentTime.getFullYear()}-01-01T00:00:00Z`),
        new UTCDate(`${lastTrigger.getFullYear()}-01-01T00:00:00Z`)
      ); // Can't use modulus here, since there's not a constant number of days in a year.
    this.hours = differenceInHours(currentTime, lastTrigger) % 24;
    this.minutes = differenceInMinutes(currentTime, lastTrigger) % 60;
    this.seconds = differenceInSeconds(currentTime, lastTrigger) % 60;

    const multiplier =
      this.years > 0
        ? 365 * 24 * 60
        : this.days > 0
        ? 24 * 60
        : this.hours > 0
        ? 60
        : 1;

    this.refreshInterval = 1000 * multiplier;
  }

  public toString(): string {
    const yearsPart = this.years > 0 ? `${this.years}Y ` : '';
    const daysPart = this.days > 0 ? `${this.days}D ` : '';
    const hoursPart =
      this.hours > 0
        ? this.hours < 10 && this.years === 0 && this.days === 0
          ? `0${this.hours}`
          : `${this.hours}`
        : '00';
    const minutesPart =
      this.minutes > 0
        ? this.minutes < 10
          ? `0${this.minutes}`
          : `${this.minutes}`
        : '00';
    const secondsPart =
      this.seconds > 0
        ? this.seconds < 10
          ? `0${this.seconds}`
          : `${this.seconds}`
        : '00';

    switch (this.refreshInterval) {
      case 1000:
      case 60000:
        return `${yearsPart}${daysPart}${hoursPart}:${minutesPart}:${secondsPart}`;
      default:
        return `${yearsPart}${daysPart}${hoursPart}H`;
    }
  }
}
