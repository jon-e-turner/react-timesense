import { DEFAULT_EVENT_GLYPH } from '@/types/icons';
import type { ITimeSenseEvent } from '@/types/time-since-event';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type TsEventDetailsProps = {
  tsEvent?: ITimeSenseEvent;
  isVisible: boolean;
  onClose: (tsEvent?: ITimeSenseEvent) => void;
};

export default function TsEventDetails({
  tsEvent,
  isVisible,
  onClose,
}: TsEventDetailsProps) {
  const [isDirty, setIsDirty] = useState(false);

  const handleModalClose = (ignoreChanges: boolean = false) => {
    if (isDirty && !ignoreChanges) {
      onClose(tsEvent);
    } else {
      onClose();
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
          name={tsEvent?.icon ?? DEFAULT_EVENT_GLYPH}
        />
        <Text
          style={styles.titleText}
          onLongPress={() => handleEventNameEdit()}
        >
          {tsEvent?.name}
        </Text>
        <Pressable style={styles.doneButton} onPress={() => handleModalClose()}>
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
