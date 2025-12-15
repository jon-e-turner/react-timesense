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

  const handleModalClose = (ignoreChanges: boolean = false) => {
    if (isDirty && !ignoreChanges) {
      onClose(event);
    } else {
      onClose();
    }

    setIsDirty(false);
  };

  const handleEventNameEdit = () => {
    setIsDirty(true);
  };

  return (
    <Modal
      animationType="fade"
      onRequestClose={() => handleModalClose()}
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.detailsModal}>
        <View style={styles.headerRow}>
          <MaterialIcons
            size={styles.titleText.fontSize * 0.85}
            name={event?.icon ?? 'bookmark'}
          />
          <Text
            style={styles.titleText}
            onLongPress={() => handleEventNameEdit()}
          >
            {event?.name}
          </Text>
          <Pressable
            style={styles.doneButton}
            onPress={() => handleModalClose()}
          >
            <MaterialIcons
              color={styles.doneButton.color}
              size={styles.titleText.fontSize * 0.85}
              name="done"
            />
          </Pressable>
          <Pressable
            style={styles.closeButton}
            onPress={() => handleModalClose(true)}
          >
            <MaterialIcons
              color={styles.closeButton.color}
              size={styles.titleText.fontSize * 0.85}
              name={isDirty ? 'delete' : 'close'}
            />
          </Pressable>
        </View>
        <View style={styles.detailsContent}></View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  detailsModal: {
    minHeight: '25%',
    width: '100%',
    backgroundColor: '#0c2645c0',
    borderRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  detailsContent: {},
  headerRow: {
    height: '16%',
    backgroundColor: '#004a77c0',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    flexGrow: 1,
    fontSize: 32,
  },
  closeButton: {
    backgroundColor: '#560000c0',
    color: '#f0f0f0c0',
  },
  doneButton: {
    backgroundColor: '#074c07c0',
    color: '#f0f0f0c0',
  },
});
