import { defaultTheme as styles } from '@/themes/default-theme';
import type { TimeSinceEvent } from '@/types/time-since-event';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { FlatList, Modal, Pressable, type ModalProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import EventDetails, { type EventDetailsProps } from './event-details';
import EventListItem from './event-list-item';

const loadData = (): TimeSinceEvent[] => {
  return [
    {
      createdOn: new Date('2025-12-10T00:00:00Z'),
      id: 'first',
      name: 'first event',
      triggerHistory: [],
    },
    {
      createdOn: new Date('2025-12-10T00:00:00Z'),
      icon: 'chat-bubble-outline',
      id: 'second',
      name: 'second event',
      triggerHistory: [],
    },
    {
      createdOn: new Date('2025-12-10T00:00:00Z'),
      icon: 'work-outline',
      id: 'third',
      name: 'third event',
      triggerHistory: [],
    },
    {
      createdOn: new Date('2025-12-10T00:00:00Z'),
      id: 'fourth',
      name: 'fourth event',
      triggerHistory: [],
    },
    {
      createdOn: new Date('2025-12-10T00:00:00Z'),
      id: 'fifth',
      name: 'fifth event',
      triggerHistory: [],
    },
    {
      createdOn: new Date('2025-12-10T00:00:00Z'),
      icon: 'lightbulb-outline',
      id: 'sixth',
      name: 'sixth event',
      triggerHistory: [],
    },
    {
      createdOn: new Date('2025-12-10T00:00:00Z'),
      icon: 'favorite',
      id: 'seventh',
      name: 'seventh event',
      triggerHistory: [],
    },
    {
      createdOn: new Date('2025-12-10T00:00:00Z'),
      id: 'eighth',
      name: 'eighth event',
      triggerHistory: [],
    },
  ];
};

const EventDetailsModal = React.forwardRef(function eventDetailsModal(
  props: EventDetailsProps & ModalProps,
  ref: React.Ref<Modal>
) {
  // some additional logic
  return (
    <Modal
      animationType="fade"
      ref={ref}
      visible={props.isVisible}
      transparent={true}
    >
      <EventDetails {...props} />
    </Modal>
  );
});

const AnimatedModal = Animated.createAnimatedComponent(EventDetailsModal);

export default function EventsList() {
  const ref = useRef<Modal | null>(null);
  const [events, setEvents] = useState<TimeSinceEvent[]>(loadData);
  const [selected, setSelected] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleAddItemPress = () => {
    const newEvent = {
      createdOn: new Date(),
      icon: 'lightbulb-outline',
      id: 'new', // This needs to be an idempotent function.
      name: 'new event',
      triggerHistory: [],
    } as TimeSinceEvent;

    setEvents([...events, newEvent]);
  };

  const handleModalClose = (event?: TimeSinceEvent) => {
    if (event) {
      // CRUD: update the record
    }

    setIsModalVisible(false);
  };

  const handleListItemLongPress = (id: string) => {
    setIsModalVisible(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AnimatedModal
          ref={ref}
          style={{ justifyContent: 'center' }}
          event={events.find((evt) => evt.id === selected)}
          isVisible={isModalVisible}
          onClose={handleModalClose}
        />
        <FlatList
          data={events}
          renderItem={({ item }) => {
            return (
              <Pressable
                key={item.id}
                onPressOut={() => {
                  setSelected(item.id);
                }}
                onLongPress={() => {
                  handleListItemLongPress(item.id);
                }}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? styles.container.backgroundColor
                      : styles.logBox.backgroundColor,
                  },
                  styles.wrapperCustom,
                ]}
              >
                <EventListItem
                  icon={item.icon ?? 'bookmark-outline'}
                  id={item.id}
                  name={item.name}
                  isSelected={item.id === selected}
                />
              </Pressable>
            );
          }}
        />
        <Pressable onPress={() => handleAddItemPress()}>
          <MaterialIcons
            size={65}
            name="add-circle-outline"
            style={[{ marginStart: 'auto' }]}
          />
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
