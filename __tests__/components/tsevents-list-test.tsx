import TsEventsList from '@/components/tsevents-list';
import { addTsEvent, getAllTsEvents } from '@/db/tsevent-operations';
import type { ITimeSenseEvent } from '@/types/time-sense-event';
import { UTCDate } from '@date-fns/utc';
import {
  fireEventAsync,
  renderAsync,
  screen,
} from '@testing-library/react-native';
import { SQLiteDatabase } from 'expo-sqlite';

// Fix for https://github.com/expo/expo/issues/21434
jest.mock('expo-font');
jest.mock('expo-asset');

jest.mock(
  'react-native-safe-area-context',
  () => jest.requireActual('react-native-safe-area-context/jest/mock').default,
);

const mockedDatabase = jest.mocked(SQLiteDatabase);
jest.mock('expo-sqlite', () => ({
  useSQLiteContext: jest.fn(() => {}),
  SQLiteDatabase: jest.fn(() => mockedDatabase),
}));

const itemList: ITimeSenseEvent[] = [
  {
    id: 1,
    name: 'first test',
    icon: 'gamepad',
    triggerHistory: [
      {
        timestamp: new UTCDate(),
        tags: ['user'],
      },
    ],
  },
  {
    id: 2,
    name: 'second test',
    icon: 'running-with-errors',
    triggerHistory: [],
  },
];

jest.mock('@/db/tsevent-operations', () => ({
  addTsEvent: jest.fn(),
  deleteTsEvents: jest.fn(),
  getAllTsEvents: jest.fn(),
  updateTsEvent: jest.fn(),
}));

describe('<TsEventsList />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Renders the default elements', async () => {
    jest.mocked(getAllTsEvents).mockResolvedValue([]);

    await renderAsync(<TsEventsList />);

    screen.getByLabelText('main screen');
    screen.getByLabelText('list of events');
    screen.getByLabelText('add new event');
    expect(() => screen.getAllByTestId(/listItem\d+/)).toThrow();
  });

  it('Renders an event list correctly', async () => {
    jest.mocked(getAllTsEvents).mockResolvedValue(itemList);

    await renderAsync(<TsEventsList />);

    const tsEventListItems = screen.getAllByTestId(/listItem\d+/);
    screen.getByLabelText('main screen');
    screen.getByLabelText('list of events');
    screen.getByLabelText('add new event');
    expect(tsEventListItems).toHaveLength(2);
  });

  it('Adds a new item when add button is pressed', async () => {
    jest.mocked(getAllTsEvents).mockResolvedValue(itemList);
    jest.mocked(addTsEvent).mockResolvedValue({
      id: 3,
      icon: 'lightbulb-outline',
      name: 'new event',
      triggerHistory: [],
    });

    await renderAsync(<TsEventsList />);
    await fireEventAsync(screen.getByLabelText('add new event'), 'press');

    const tsEventListItems = screen.getAllByTestId(/listItem\d+/);
    expect(tsEventListItems).toHaveLength(3);
    screen.getByTestId('listItem3');
  });

  it('Expands and collapses list items on long-press', async () => {
    jest.mocked(getAllTsEvents).mockResolvedValue(itemList);

    await renderAsync(<TsEventsList />);

    // Open one.
    await fireEventAsync(screen.getByTestId('listItem1'), 'longPress');
    // jest doesn't automatically call pressOut with longPress, but there is logic
    // on the event handler.
    await fireEventAsync(screen.getByTestId('listItem1'), 'pressOut');
    screen.getByTestId('listItem1Details');

    // Open the second.
    await fireEventAsync(screen.getByTestId('listItem2'), 'longPress');
    await fireEventAsync(screen.getByTestId('listItem2'), 'pressOut');
    screen.getByTestId('listItem1Details');
    screen.getByTestId('listItem2Details');

    // Close the second.
    await fireEventAsync(screen.getByTestId('listItem2'), 'longPress');
    await fireEventAsync(screen.getByTestId('listItem2'), 'pressOut');
    screen.getByTestId('listItem1Details');
    expect(() => screen.getByTestId('listItem2Details')).toThrow();
  });

  it('Switches to/from delete mode on add/remove button long press', async () => {
    jest.mocked(getAllTsEvents).mockResolvedValue(itemList);

    await renderAsync(<TsEventsList />);

    // Enter delete mode
    await fireEventAsync(screen.getByLabelText('add new event'), 'longPress');
    screen.getByTestId('removeListItem1');
    screen.getByTestId('removeListItem2');

    // Exit delete mode
    await fireEventAsync(
      screen.getByLabelText('remove selected events'),
      'longPress',
    );
    expect(() => screen.getByTestId('removeListItem1')).toThrow();
    expect(() => screen.getByTestId('removeListItem2')).toThrow();
  });
});
