import { defaultTheme as styles } from '@/themes/default-theme';
import { TimeSenseEvent, type ITimeSenseEvent } from '@/types/time-since-event';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TsEventListItem from './event-list-item';

const loadData = (): ITimeSenseEvent[] => {
  return [
    new TimeSenseEvent({
      createdOn: new Date('2025-12-10T00:00:00Z'),
      id: 'first',
      name: 'first event',
      triggerHistory: [],
    }),
    new TimeSenseEvent({
      createdOn: new Date('2025-12-10T00:00:00Z'),
      icon: 'chat-bubble-outline',
      id: 'second',
      name: 'second event',
      triggerHistory: [],
    }),
    new TimeSenseEvent({
      createdOn: new Date('2025-12-10T00:00:00Z'),
      icon: 'work-outline',
      id: 'third',
      name: 'third event',
      triggerHistory: [],
    }),
    new TimeSenseEvent({
      createdOn: new Date('2025-12-10T00:00:00Z'),
      id: 'fourth',
      name: 'fourth event',
      triggerHistory: [],
    }),
    new TimeSenseEvent({
      createdOn: new Date('2025-12-10T00:00:00Z'),
      id: 'fifth',
      name: 'fifth event',
      triggerHistory: [],
    }),
    new TimeSenseEvent({
      createdOn: new Date('2025-12-10T00:00:00Z'),
      icon: 'lightbulb-outline',
      id: 'sixth',
      name: 'sixth event',
      triggerHistory: [],
    }),
    new TimeSenseEvent({
      createdOn: new Date('2025-12-10T00:00:00Z'),
      icon: 'favorite',
      id: 'seventh',
      name: 'seventh event',
      triggerHistory: [],
    }),
    new TimeSenseEvent({
      createdOn: new Date('2025-12-10T00:00:00Z'),
      id: 'eighth',
      name: 'eighth event',
      triggerHistory: [],
    }),
  ];
};

export default function TsEventsList() {
  const [tsEvents, setTsEvents] = useState<ITimeSenseEvent[]>(loadData);
  const [selected, setSelected] = useState<string>('');
  const [detailsExpanded, setDetailsExpanded] = useState<string[]>([]);

  const handleAddItemPress = () => {
    const newTsEvent = {
      createdOn: new Date(),
      icon: 'lightbulb-outline',
      id: 'new', // This needs to be an idempotent function.
      name: 'new event',
      triggerHistory: [],
    } as ITimeSenseEvent;

    setTsEvents([...tsEvents, newTsEvent]);
  };

  const handleListItemLongPress = (id: string) => {
    if (detailsExpanded.includes(id)) {
      setDetailsExpanded(detailsExpanded.filter((d) => d !== id));
    } else {
      setDetailsExpanded([...detailsExpanded, id]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={tsEvents}
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
                <TsEventListItem
                  timeSenseEvent={item}
                  isSelected={item.id === selected}
                  showDetails={detailsExpanded.includes(item.id)}
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
