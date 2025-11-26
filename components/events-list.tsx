import { defaultTheme as styles } from '@/themes/default-theme';
import type { TimeSinceEvent } from '@/types/time-since-event';
import { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import EventListItem from './event-list-item';

const loadData = (): TimeSinceEvent[] => {
  return [
    {
      id: 'first',
      name: 'first event',
      lastTriggered: undefined,
      triggerCount: 0,
      triggerHistory: [],
    },
    {
      icon: 'alarm',
      id: 'second',
      name: 'second event',
      lastTriggered: undefined,
      triggerCount: 0,
      triggerHistory: [],
    },
    {
      icon: 'airplane-outline',
      id: 'third',
      name: 'third event',
      lastTriggered: undefined,
      triggerCount: 0,
      triggerHistory: [],
    },
    {
      id: 'fourth',
      name: 'fourth event',
      lastTriggered: undefined,
      triggerCount: 0,
      triggerHistory: [],
    },
    {
      id: 'fifth',
      name: 'fifth event',
      lastTriggered: undefined,
      triggerCount: 0,
      triggerHistory: [],
    },
    {
      icon: 'book-outline',
      id: 'sixth',
      name: 'sixth event',
      lastTriggered: undefined,
      triggerCount: 0,
      triggerHistory: [],
    },
    {
      id: 'seventh',
      name: 'seventh event',
      lastTriggered: undefined,
      triggerCount: 0,
      triggerHistory: [],
    },
    {
      id: 'eighth',
      name: 'eighth event',
      lastTriggered: undefined,
      triggerCount: 0,
      triggerHistory: [],
    },
  ];
};

export default function EventsList() {
  const [events, setEvents] = useState<TimeSinceEvent[]>(loadData);
  const [selected, setSelected] = useState<string>(events[0]?.id);

  const handlePress = (id: string) => {
    setSelected(id);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={events}
          renderItem={({ item }) => {
            return (
              <Pressable
                key={item.id}
                onPress={() => {
                  handlePress(item.id);
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
                  icon={item.icon ?? 'alarm-outline'}
                  id={item.id}
                  name={item.name}
                  isSelected={item.id === selected}
                />
              </Pressable>
            );
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
