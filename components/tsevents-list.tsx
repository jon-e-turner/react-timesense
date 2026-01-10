import {
  addTsEvent,
  getAllTsEvents,
  updateTsEvent,
} from '@/db/tsevent-operations';
import { defaultTheme as styles } from '@/themes/default-theme';
import { type ITimeSenseEvent } from '@/types/time-sense-event';
import { UTCDate } from '@date-fns/utc';
import { MaterialIcons } from '@expo/vector-icons';
import { useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TsEventDetails from './tsevent-details';
import TsEventListItemHeader from './tsevent-list-item';

export default function TsEventsList() {
  const db = useSQLiteContext();
  const [tsEvents, setTsEvents] = useState<ITimeSenseEvent[]>([]);
  const [selected, setSelected] = useState<number>();
  const [detailsExpanded, setDetailsExpanded] = useState<number[]>([]);

  useEffect(() => {
    async function loadData(db: SQLiteDatabase) {
      const data = await getAllTsEvents(db, true);
      setTsEvents(data);
    }
    loadData(db);
  }, [db]);

  const handleAddItemPress = async () => {
    const newTsEvent = await addTsEvent(db, {
      icon: 'lightbulb-outline',
      name: 'new event',
      triggerHistory: [{ timestamp: new UTCDate(), tags: ['meta'] }],
    });

    setTsEvents([...tsEvents, newTsEvent]);
  };

  const handleListItemLongPress = (id: number) => {
    if (detailsExpanded.includes(id)) {
      setDetailsExpanded(detailsExpanded.filter((d) => d !== id));
    } else {
      setDetailsExpanded([...detailsExpanded, id]);
    }
  };

  const handleListItemPropChange = async (
    id: number,
    prop?: string,
    newValue?: string
  ) => {
    if (prop !== undefined && newValue !== undefined) {
      const existing = tsEvents.find((t) => t.id === id);
      if (!existing) {
        throw new Error(`We should never get here, wtf?
        \ttsEvents: ${tsEvents}
        \texisting: ${existing}
        \tprop: ${prop}
        \tnewValue: ${newValue}
        \tid: ${id}`);
      }

      const newTsEvent = await updateTsEvent(db, {
        ...existing,
        [prop]: newValue,
      });

      setTsEvents(
        tsEvents.map((t) => {
          if (t.id === id) {
            return newTsEvent;
          }

          return t;
        })
      );
    }
    setDetailsExpanded(detailsExpanded.filter((d) => d !== id));
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
                  handleListItemLongPress(item.id!);
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
                <TsEventListItemHeader
                  timeSenseEvent={item}
                  isSelected={item.id === selected}
                />
                {detailsExpanded.includes(item.id!) ? (
                  <TsEventDetails
                    tsEventId={item.id}
                    detailsText={item.details}
                    handleDetailsChange={handleListItemPropChange}
                  />
                ) : null}
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
