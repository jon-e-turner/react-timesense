import { defaultTheme } from '@/themes/default-theme';
import type { HistoryTag } from '@/types/history-tag';
import type { ITimeSenseEvent } from '@/types/time-sense-event';
import { UTCDate } from '@date-fns/utc';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import TimeSinceDisplay from './time-since-display';

type TsEventListItemHeaderProps = {
  timeSenseEvent: ITimeSenseEvent;
  isSelected: boolean;
};

function getLatestTrigger(
  history: { tags: HistoryTag[]; timestamp: UTCDate }[],
): UTCDate | undefined {
  switch (history.length) {
    case 0:
      return undefined;
    case 1:
      return new UTCDate(history[0].timestamp);
    default:
      return new UTCDate(
        history.reduce((a, b) => (a.timestamp > b.timestamp ? a : b)).timestamp,
      );
  }
}

export default function TsEventListItemHeader({
  timeSenseEvent,
  isSelected,
}: TsEventListItemHeaderProps) {
  return (
    <View
      id={timeSenseEvent.id.toString()}
      style={{ flexDirection: 'column' }}
    >
      <View
        aria-label={`${timeSenseEvent.name}-${
          isSelected ? '' : 'not-'
        }selected`}
        style={styles.tsEventListItem}
      >
        <MaterialIcons
          style={styles.eliIcon}
          name={timeSenseEvent.icon}
        />
        <Text style={styles.eliTitle}>{timeSenseEvent.name}</Text>
        <View style={{ ...styles.wrapperCustom, justifyContent: 'center' }}>
          {timeSenseEvent.triggerHistory[0] !== null ? (
            <TimeSinceDisplay
              lastTrigger={getLatestTrigger(timeSenseEvent.triggerHistory)}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...defaultTheme,
  tsEventListItem: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 50,
  },
  eliIcon: {
    fontSize: 50,
    paddingEnd: 8,
  },
  eliTitle: {
    flex: 3,
    fontSize: 24,
    alignContent: 'center',
  },
  eliDetails: {
    minHeight: 50,
    backgroundColor: '#0c2645',
    fontSize: 20,
  },
  eliDetailText: {
    textAlignVertical: 'top',
    color: '#f0f0f0',
  },
});
