import { defaultTheme as styles } from '@/themes/default-theme';
import type { TimeSinceEvent } from '@/types/time-since-event';
import { MaterialIcons } from '@expo/vector-icons';
import React, { Activity, useState } from 'react';
import { FlatList, Modal, Pressable } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import EventDetails from './event-details';
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

export default function EventsList() {
  const startingCenter = useSharedValue<number>(0);
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
    startingCenter.value = 100;
    setIsModalVisible(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Activity mode={isModalVisible ? 'visible' : 'hidden'}>
          <Modal
            visible={isModalVisible}
            transparent={true}
            onRequestClose={() => handleModalClose()}
          >
            <EventDetails
              handleModalClose={handleModalClose}
              timeSinceEvent={events.find((evt) => evt.id === selected)}
            />
          </Modal>
        </Activity>
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
        {isModalVisible ? (
          <Pressable onPress={() => handleModalClose()}>
            <MaterialIcons
              size={65}
              style={{ marginStart: 'auto' }}
              name="close-fullscreen"
            />
          </Pressable>
        ) : null}
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
