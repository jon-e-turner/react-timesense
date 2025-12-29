import { defaultTheme as styles } from '@/themes/default-theme';
import { TimeSenseEvent, type ITimeSenseEvent } from '@/types/time-sense-event';
import { UTCDate } from '@date-fns/utc';
import { MaterialIcons } from '@expo/vector-icons';
import { useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TsEventListItem from './tsevent-list-item';

export default function TsEventsList() {
  const db = useSQLiteContext();
  const [tsEvents, setTsEvents] = useState<ITimeSenseEvent[]>([]);
  const [selected, setSelected] = useState<number>();
  const [detailsExpanded, setDetailsExpanded] = useState<number[]>([]);

  useEffect(() => {
    async function loadData(db: SQLiteDatabase) {
      const data = await db.getAllAsync<
        TimeSenseEvent & { triggerHistory?: string }
      >(
        `SELECT
          ts.rowid as id, ts.createdOn, ts.details, ts.icon, ts.name,
          COALESCE(GROUP_CONCAT(et.triggerTimestamp, ','), '') as triggerHistory
        FROM timeSenseEvents AS ts
        LEFT JOIN eventTriggers AS et
        ON ts.rowid == et.tsEventId
        GROUP BY ts.rowid;`
      );

      const normData = data.map((d) => {
        if (d.triggerHistory && typeof d.triggerHistory == 'string') {
          const histAsArray: UTCDate[] = d.triggerHistory
            .split(',')
            .map((h) => new UTCDate(h));

          return { ...d, triggerHistory: histAsArray };
        }

        return new TimeSenseEvent({ ...d, triggerHistory: [] });
      });

      setTsEvents(normData);
    }
    loadData(db);
  }, [db]);

  const handleAddItemPress = () => {
    const newTsEvent = new TimeSenseEvent({
      icon: 'lightbulb-outline',
      name: 'new event',
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
                <TsEventListItem
                  timeSenseEvent={item}
                  isSelected={item.id === selected}
                  showDetails={detailsExpanded.includes(item.id!)}
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
