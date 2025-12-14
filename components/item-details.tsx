import type { TimeSinceEvent } from '@/types/time-since-event';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type EventDetailsProps = {
  event?: TimeSinceEvent;
  isVisible: boolean;
  onClose: (event?: TimeSinceEvent) => void;
};

export default function EventDetails({
  event,
  isVisible,
  onClose,
}: EventDetailsProps) {
  const [isDirty, setIsDirty] = useState(false);

  const handleModalClose = () => {
    if (isDirty) {
      onClose(event);
    } else {
      onClose();
    }
  };

  const handleEventNameEdit = () => {};

  return (
    <Modal
      animationType="fade"
      onRequestClose={() => handleModalClose()}
      style={styles.detailsModal}
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.headerRow}>
        <MaterialIcons name={event?.icon ?? 'bookmark'} />
        <Text style={{ flexGrow: 1 }} onLongPress={() => handleEventNameEdit()}>
          {event?.name ?? ''}
        </Text>
        <Pressable onPress={() => handleModalClose()}>
          <MaterialIcons name="close" />
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  detailsModal: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    fontSize: 32,
  },
});
