import { UTCDate } from '@date-fns/utc';
import { interval, intervalToDuration, type Duration } from 'date-fns';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TimeSinceDisplay({ lastTrigger = new UTCDate() }) {
  const [currentTime, setCurrentTime] = useState(new UTCDate());

  const timeSince = intervalToDuration(interval(lastTrigger, currentTime));

  const refreshInterval =
    (timeSince.years ?? 0 === 0) && (timeSince.days ?? 0 === 0) ? 1000 : 86400; //24 * 60 * 60

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

function formatDuration(
  duration: Duration,
  refreshInterval: number = 1000
): string {
  const normalizedDuration = {
    years: duration.years ?? 0,
    months: duration.months ?? 0,
    days: duration.days ?? 0,
    hours: duration.hours ?? 0,
    minutes: duration.minutes ?? 0,
    seconds: duration.seconds ?? 0,
  };

  const yearsPart =
    normalizedDuration.years > 0 ? `${normalizedDuration.years}Y ` : '';
  const monthsPart =
    normalizedDuration.months > 0 ? `${normalizedDuration.months}M ` : '';
  const daysPart =
    normalizedDuration.days > 0 ? `${normalizedDuration.days}D ` : '';
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
    case 1000:
      return `${yearsPart}${monthsPart}${daysPart}${hoursPart}:${minutesPart}:${secondsPart}`;
    default:
      return `${yearsPart}${monthsPart}${daysPart}${hoursPart}H`;
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
