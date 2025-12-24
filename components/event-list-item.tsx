import { defaultTheme } from '@/themes/default-theme';
import type { ITimeSenseEvent } from '@/types/time-since-event';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type EventListItemProps = {
  timeSenseEvent: ITimeSenseEvent;
  isSelected: boolean;
  showDetails: boolean;
};

export default function EventListItem({
  timeSenseEvent,
  isSelected,
  showDetails,
}: EventListItemProps) {
  return (
    <View id={timeSenseEvent.id} style={{ flexDirection: 'column' }}>
      <View aria-selected={isSelected} style={styles.eventListItem}>
        <MaterialIcons style={styles.eliIcon} name={timeSenseEvent.icon} />
        <Text style={styles.eliTitle}>{timeSenseEvent.name}</Text>
        <MaterialIcons
          style={{
            visibility: isSelected ? 'visible' : 'hidden',
            alignContent: 'flex-end',
            fontSize: styles.eliIcon.fontSize / 3,
          }}
          name="star"
        />
      </View>
      {showDetails ? (
        <View
          style={{
            ...styles.wrapperCustom,
            ...styles.eliDetails,
            visibility: showDetails ? 'visible' : 'hidden',
          }}
        >
          <Text style={styles.eliDetailText}>Lorum ipsum dolos et.</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  ...defaultTheme,
  eventListItem: {
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
    color: '#f0f0f0',
  },
});
