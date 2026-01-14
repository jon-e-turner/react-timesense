import TimeSinceDisplay from '@/components/time-since-display';
import { UTCDate } from '@date-fns/utc';
import { render, waitFor } from '@testing-library/react-native';

const BASE_TIME = '2025-01-10T12:00:00Z';

describe('<TimeSinceDisplay />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new UTCDate(BASE_TIME));
  });

  it('Renders a few hours duration correctly', async () => {
    const { getByText } = render(
      <TimeSinceDisplay lastTrigger={new UTCDate('2025-01-10T09:40:30Z')} />
    );

    await waitFor(() => {
      getByText('02:19:30');
    });
  });

  it('Updates the render of a few hours duration correctly', async () => {
    const { getByText } = render(
      <TimeSinceDisplay lastTrigger={new UTCDate('2025-01-10T09:40:30Z')} />
    );

    await waitFor(() => {
      jest.advanceTimersByTime(3000);
      getByText('02:19:33');
    });
  });

  it('Renders a few day duration correctly', async () => {
    const { getByText } = render(
      <TimeSinceDisplay lastTrigger={new UTCDate('2025-01-06T09:40:30Z')} />
    );

    await waitFor(() => {
      getByText('4D 2:19');
    });
  });

  it('Renders a few month duration correctly', async () => {
    const { getByText } = render(
      <TimeSinceDisplay lastTrigger={new UTCDate('2024-06-10T09:40:30Z')} />
    );

    await waitFor(() => {
      getByText('7M 0D');
    });
  });

  it('Renders a long duration correctly', async () => {
    const { getByText } = render(
      <TimeSinceDisplay lastTrigger={new UTCDate('2020-06-10T09:40:30Z')} />
    );

    await waitFor(() => {
      getByText('4Y 7M 0D');
    });
  });
});
