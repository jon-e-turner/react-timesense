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

  constructor(
    years?: number,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number
  ) {
    this.years = years ?? 0;
    this.days = days ?? 0;
    this.hours = hours ?? 0;
    this.minutes = minutes ?? 0;
    this.seconds = seconds ?? 0;

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
