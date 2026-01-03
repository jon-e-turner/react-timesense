import { TimeSince } from '@/types/time-since';
import { UTCDate } from '@date-fns/utc';
import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInYears,
} from 'date-fns';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TimeSinceDisplay({ lastTrigger = new UTCDate() }) {
  const [currentTime, setCurrentTime] = useState(new UTCDate());

  const timeSince = new TimeSince(
    differenceInYears(currentTime, lastTrigger),
    differenceInCalendarDays(currentTime, lastTrigger) -
      differenceInCalendarDays(
        new UTCDate(`${currentTime.getFullYear()}-01-01T00:00:00Z`),
        new UTCDate(`${lastTrigger.getFullYear()}-01-01T00:00:00Z`)
      ), // Can't use modulus here, since there's not a constant number of days in a year.
    differenceInHours(currentTime, lastTrigger) % 24,
    differenceInMinutes(currentTime, lastTrigger) % 60,
    differenceInSeconds(currentTime, lastTrigger) % 60
  );

  const refreshInterval = timeSince.refreshInterval ?? 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new UTCDate());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return (
    <View style={styles.eliTimerView}>
      <Text style={styles.eliTimerText}>{timeSince.toString()}</Text>
    </View>
  );
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
