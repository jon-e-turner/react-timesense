import TsEventListItemHeader from '@/components/tsevent-list-item';
import type { ITimeSenseEvent } from '@/types/time-sense-event';
import { UTCDate } from '@date-fns/utc';
import { renderAsync } from '@testing-library/react-native';

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
    const { getByText, getByLabelText } = await renderAsync(
      <TsEventListItemHeader timeSenseEvent={testTsEvent} isSelected={false} />
    );

    getByText(testTsEvent.name);
    getByText('1Y 0M 0D');
    getByLabelText(`${testTsEvent.name}-not-selected`);
  });

  it('Renders correctly with null trigger history', async () => {
    const { getByText, getByLabelText } = await renderAsync(
      <TsEventListItemHeader
        // The database returns an array with a single `null` element.
        timeSenseEvent={{ ...testTsEvent, triggerHistory: [null!] }}
        isSelected={false}
      />
    );

    getByText(testTsEvent.name);
    getByLabelText(`${testTsEvent.name}-not-selected`);
  });

  it('Renders correctly with no trigger history', async () => {
    const { getByText, getByLabelText } = await renderAsync(
      <TsEventListItemHeader
        // Also test with an empty array in case I fix the issue above.
        timeSenseEvent={{ ...testTsEvent, triggerHistory: [] }}
        isSelected={false}
      />
    );

    getByText(testTsEvent.name);
    getByLabelText(`${testTsEvent.name}-not-selected`);
  });

  it('Renders correctly with one trigger history entry', async () => {
    const oneTrigger = {
      ...testTsEvent,
      triggerHistory: [testTsEvent.triggerHistory[1]],
    };
    const { getByText, getByLabelText } = await renderAsync(
      <TsEventListItemHeader
        // The database returns an array with a single `null` element.
        timeSenseEvent={oneTrigger}
        isSelected={true}
      />
    );

    getByText(testTsEvent.name);
    getByText('1Y 0M 2D');
    getByLabelText(`${testTsEvent.name}-selected`);
  });

  it('Renders correctly regardless of trigger history entry order', async () => {
    const oneTrigger = {
      ...testTsEvent,
      triggerHistory: [
        testTsEvent.triggerHistory[1],
        testTsEvent.triggerHistory[0],
      ],
    };
    const { getByText, getByLabelText } = await renderAsync(
      <TsEventListItemHeader
        // The database returns an array with a single `null` element.
        timeSenseEvent={oneTrigger}
        isSelected={false}
      />
    );

    getByText(testTsEvent.name);
    getByText('1Y 0M 0D');
    getByLabelText(`${testTsEvent.name}-not-selected`);
  });
});
