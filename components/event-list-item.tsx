import type { TimeSinceEventGlyph } from '@/types/icons';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type EventListItemProps = {
  icon?: TimeSinceEventGlyph;
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
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

export default function EventListItem(props: EventListItemProps) {
  return (
    <View
      id={props.id}
      aria-selected={props.isSelected}
      style={styles.eventListItem}
    >
      <MaterialIcons size={styles.tinyLogo.width} name={props.icon} />
      <Text style={{ flex: 1 }}>{props.name}</Text>
      <MaterialIcons
        style={{
          visibility: props.isSelected ? 'visible' : 'hidden',
          margin: 'auto',
        }}
        size={styles.tinyLogo.width / 3}
        name="star"
      />
    </View>
  );
}
