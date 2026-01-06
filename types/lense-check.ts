import { UTCDate } from '@date-fns/utc';
import { TimeSince } from './time-since';

export type LenseCheck = {
  check: boolean | (() => boolean);
  label?: string;
};

const base = new UTCDate(2025, 0, 1, 0, 0, 0, 0); // Jan 1, 2025 00:00:00
const basePlus5 = new UTCDate(2025, 0, 1, 0, 5, 0, 0); // Jan 1, 2025 00:05:00
const testNow = new UTCDate();

export const LenseTests: LenseCheck[] = [
  { check: () => 1 === 1, label: 'Index: 1 === 1' },

  // No time elapsed tests.
  {
    check: () =>
      new TimeSince(testNow, testNow).equals(new TimeSince(testNow, testNow)),
    label: 'Instance equality: 0 time elapsed',
  },
  {
    check: () =>
      new TimeSince(testNow, testNow).equals({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        refreshInterval: 1000,
      } as TimeSince),
    label: 'Instance values: 0 time elapsed',
  },
  {
    check: () => new TimeSince(testNow, testNow).toString() === '00:00:00',
    label: 'String representation: 0 time elapsed',
  },

  // Small elapsed time tests
  {
    check: () =>
      new TimeSince(basePlus5, base).equals({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 5,
        seconds: 0,
        refreshInterval: 1000,
      } as TimeSince),
  },
];
