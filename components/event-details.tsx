import type { TimeSinceEvent } from '@/types/time-since-event';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type EventDetailsProps = {
  timeSinceEvent?: TimeSinceEvent;
  handleModalClose: (timeSinceEvent?: TimeSinceEvent) => void;
};

export default function EventDetails({
  timeSinceEvent,
  handleModalClose,
}: EventDetailsProps) {
  const [isDirty, setIsDirty] = useState(false);

  const handleDetailClose = (ignoreChanges: boolean = false) => {
    if (isDirty && !ignoreChanges) {
      handleModalClose(timeSinceEvent);
    } else {
      handleModalClose();
    }

    setIsDirty(false);
  };

  const handleEventNameEdit = () => {
    setIsDirty(true);
  };

  return (
    <View style={styles.detailsModal}>
      <View style={styles.headerRow}>
        <MaterialIcons
          size={styles.titleText.fontSize}
          name={timeSinceEvent?.icon ?? 'bookmark'}
        />
        <Text
          style={styles.titleText}
          onLongPress={() => handleEventNameEdit()}
        >
          {timeSinceEvent?.name}
        </Text>
        <Pressable
          style={styles.doneButton}
          onPress={() => handleDetailClose()}
        >
          <MaterialIcons
            color={styles.doneButton.color}
            size={styles.titleText.fontSize * 0.85}
            name="done"
          />
        </Pressable>
        <Pressable
          style={styles.closeButton}
          onPress={() => handleDetailClose(true)}
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
  );
}

const styles = StyleSheet.create({
  detailsModal: {
    minHeight: '25%',
    width: '95%',
    backgroundColor: '#0c2645d7',
    borderRadius: 18,
    position: 'absolute',
    alignSelf: 'center',
  },
  detailsContent: {},
  headerRow: {
    backgroundColor: '#0072bad7',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 10,
    paddingInlineEnd: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    flex: 1,
    fontSize: 32,
    marginStart: 4,
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
