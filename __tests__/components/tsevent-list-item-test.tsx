import TsEventListItemHeader from '@/components/tsevent-list-item';
import type { ITimeSenseEvent } from '@/types/time-sense-event';
import { UTCDate } from '@date-fns/utc';
import { renderAsync, screen } from '@testing-library/react-native';

const BASE_TIME = '2026-01-11T12:00:00Z';
const testTsEvent: ITimeSenseEvent = {
  id: 7,
  name: 'Testing Event',
  icon: 'gamepad',
  details: undefined,
  triggerHistory: [
    {
      timestamp: new UTCDate('2025-01-10T16:00:45Z'),
      tags: ['user'],
    },
    {
      timestamp: new UTCDate('2025-01-08T15:03:45Z'),
      tags: ['user'],
    },
  ],
};

describe('<TsEventListItemHeader />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new UTCDate(BASE_TIME));
  });

  it('Renders all the default elements', async () => {
    await renderAsync(
      <TsEventListItemHeader timeSenseEvent={testTsEvent} isSelected={false} />
    );

    screen.getByText(testTsEvent.name);
    screen.getByText('1Y 0M 0D');
    screen.getByLabelText(`${testTsEvent.name}-not-selected`);
  });

  it('Renders correctly with null trigger history', async () => {
    await renderAsync(
      <TsEventListItemHeader
        // The database returns an array with a single `null` element.
        timeSenseEvent={{ ...testTsEvent, triggerHistory: [null!] }}
        isSelected={false}
      />
    );

    screen.getByText(testTsEvent.name);
    screen.getByLabelText(`${testTsEvent.name}-not-selected`);
  });

  it('Renders correctly with no trigger history', async () => {
    await renderAsync(
      <TsEventListItemHeader
        // Also test with an empty array in case I fix the issue above.
        timeSenseEvent={{ ...testTsEvent, triggerHistory: [] }}
        isSelected={false}
      />
    );

    screen.getByText(testTsEvent.name);
    screen.getByLabelText(`${testTsEvent.name}-not-selected`);
  });

  it('Renders correctly with one trigger history entry', async () => {
    const oneTrigger = {
      ...testTsEvent,
      triggerHistory: [testTsEvent.triggerHistory[1]],
    };
    await renderAsync(
      <TsEventListItemHeader
        // The database returns an array with a single `null` element.
        timeSenseEvent={oneTrigger}
        isSelected={true}
      />
    );

    screen.getByText(testTsEvent.name);
    screen.getByText('1Y 0M 2D');
    screen.getByLabelText(`${testTsEvent.name}-selected`);
  });

  it('Renders correctly regardless of trigger history entry order', async () => {
    const oneTrigger = {
      ...testTsEvent,
      triggerHistory: [
        testTsEvent.triggerHistory[1],
        testTsEvent.triggerHistory[0],
      ],
    };
    await renderAsync(
      <TsEventListItemHeader
        // The database returns an array with a single `null` element.
        timeSenseEvent={oneTrigger}
        isSelected={false}
      />
    );

    screen.getByText(testTsEvent.name);
    screen.getByText('1Y 0M 0D');
    screen.getByLabelText(`${testTsEvent.name}-not-selected`);
  });
});
