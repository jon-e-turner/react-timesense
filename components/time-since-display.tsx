import { TimeSince } from '@/types/time-since';
import { UTCDate } from '@date-fns/utc';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TimeSinceDisplay({ lastTrigger = new UTCDate() }) {
  const [currentTime, setCurrentTime] = useState(new UTCDate());

  const timeSince = new TimeSince(currentTime, lastTrigger);

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
