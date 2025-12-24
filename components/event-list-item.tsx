import type { TimeSenseEventGlyph } from '@/types/icons';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type EventListItemProps = {
  icon?: TimeSenseEventGlyph;
  id: string;
  isSelected: boolean;
  name: string;
};

const styles = StyleSheet.create({
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
    flex: 1,
    fontSize: 24,
    alignContent: 'center',
  },
});

export default function EventListItem(props: EventListItemProps) {
  return (
    <View
      id={props.id}
      aria-selected={props.isSelected}
      style={styles.eventListItem}
    >
      <MaterialIcons style={styles.eliIcon} name={props.icon} />
      <Text style={styles.eliTitle}>{props.name}</Text>
      <MaterialIcons
        style={{
          visibility: props.isSelected ? 'visible' : 'hidden',
          alignContent: 'flex-end',
          fontSize: styles.eliIcon.fontSize / 3,
        }}
        name="star"
      />
    </View>
  );
}
