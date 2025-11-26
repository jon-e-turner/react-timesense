import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type EventListItemProps = {
  icon?: string;
  id: string;
  isSelected: boolean;
  name: string;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default function EventListItem(props: EventListItemProps) {
  return (
    <View id={props.id} aria-selected={props.isSelected}>
      <Ionicons
        size={styles.tinyLogo.width}
        name={props.icon ?? 'alarm-outline'}
      />
      <Text>{props.name}</Text>
    </View>
  );
}
