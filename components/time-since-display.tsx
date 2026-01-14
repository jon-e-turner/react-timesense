import { UTCDate } from '@date-fns/utc';
import { interval, intervalToDuration, type Duration } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ONE_DAY = 86400000;
const ONE_MINUTE = 60000;
const ONE_SECOND = 1000;

export default function TimeSinceDisplay({ lastTrigger = new UTCDate() }) {
  const [currentTime, setCurrentTime] = useState(new UTCDate());

  const timeSince = intervalToDuration(interval(lastTrigger, currentTime));

  const getRefreshInterval = useCallback(() => {
    if (timeSince.years && timeSince.years > 0) {
      return ONE_DAY;
    }

    if (timeSince.months && timeSince.months > 0) {
      return ONE_DAY;
    }

    if (timeSince.days && timeSince.days > 0) {
      return ONE_MINUTE;
    }

    return ONE_SECOND;
  }, [timeSince.years, timeSince.months, timeSince.days]);
  const refreshInterval = getRefreshInterval();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new UTCDate());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return (
    <View style={styles.eliTimerView}>
      <Text style={styles.eliTimerText}>
        {formatDuration(timeSince, refreshInterval)}
      </Text>
    </View>
  );
}

function formatDuration(duration: Duration, refreshInterval: number): string {
  const normalizedDuration = {
    years: duration.years ?? 0,
    months: duration.months ?? 0,
    days: duration.days ?? 0,
    hours: duration.hours ?? 0,
    minutes: duration.minutes ?? 0,
    seconds: duration.seconds ?? 0,
  };

  const yearsPart =
    normalizedDuration.years > 0 ? `${normalizedDuration.years}` : '0';
  const monthsPart =
    normalizedDuration.months > 0 ? `${normalizedDuration.months}` : '0';
  const daysPart =
    normalizedDuration.days > 0 ? `${normalizedDuration.days}` : '0';
  const hoursPart =
    normalizedDuration.hours > 0
      ? normalizedDuration.hours < 10 &&
        normalizedDuration.years === 0 &&
        normalizedDuration.days === 0
        ? `0${normalizedDuration.hours}`
        : `${normalizedDuration.hours}`
      : '00';
  const minutesPart =
    normalizedDuration.minutes > 0
      ? normalizedDuration.minutes < 10
        ? `0${normalizedDuration.minutes}`
        : `${normalizedDuration.minutes}`
      : '00';
  const secondsPart =
    normalizedDuration.seconds > 0
      ? normalizedDuration.seconds < 10
        ? `0${normalizedDuration.seconds}`
        : `${normalizedDuration.seconds}`
      : '00';

  switch (refreshInterval) {
    case ONE_SECOND:
      return `${hoursPart}:${minutesPart}:${secondsPart}`;
    case ONE_MINUTE:
      return `${daysPart}D ${hoursPart}:${minutesPart}`;
    case ONE_DAY:
    default:
      return `${
        yearsPart === '0' ? '' : yearsPart + 'Y '
      }${monthsPart}M ${daysPart}D`;
  }
}

const styles = StyleSheet.create({
  eliTimerView: {
    backgroundColor: '#0c2645',
    paddingStart: 4,
    paddingEnd: 4,
  },
  eliTimerText: {
    alignSelf: 'flex-end',
    fontSize: 28,
    fontFamily: 'monospace',
    color: '#0072ba',
  },
});
