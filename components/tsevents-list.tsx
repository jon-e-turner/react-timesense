import alert from '@/components/alert';
import TsEventDetails from '@/components/tsevent-details';
import TsEventListItemHeader from '@/components/tsevent-list-item';
import {
  addTsEvent,
  deleteTsEvents,
  getAllTsEvents,
  updateTsEvent,
} from '@/db/tsevent-operations';
import { defaultTheme as styles } from '@/themes/default-theme';
import { type ITimeSenseEvent } from '@/types/time-sense-event';
import { UTCDate } from '@date-fns/utc';
import { MaterialIcons } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';
import { useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TsEventsList() {
  const db = useSQLiteContext();
  const [detailsExpanded, setDetailsExpanded] = useState<number[]>([]);
  const [deleteSelected, setDeleteSelected] = useState<number[]>([]);
  const [inDeleteMode, setInDeleteMode] = useState<boolean>(false);
  const [tsEvents, setTsEvents] = useState<ITimeSenseEvent[]>([]);
  const [selected, setSelected] = useState<number>();

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

  const swapDeleteModeTo = (newMode: boolean) => {
    setDeleteSelected([]);
    setInDeleteMode(newMode);
  };

  const confirmRemoveListItem = () => {
    alert(
      `Delete ${deleteSelected.length} records?`,
      `Removing records is not currently reversible.`,
      [
        {
          text: 'No',
          style: 'cancel',
          onPress: () => swapDeleteModeTo(false),
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => handleRemoveListItem(),
        },
      ]
    );
  };

  const handleRemoveListItem = async () => {
    if (deleteSelected.length > 0) {
      await deleteTsEvents(db, deleteSelected);
      setTsEvents(tsEvents.filter((tse) => !deleteSelected.includes(tse.id)));
    }

    swapDeleteModeTo(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={tsEvents}
          renderItem={({ item }) => {
            return (
              <View style={styles.tsEventsListRow}>
                {inDeleteMode ? (
                  <View style={styles.removeItemColumn}>
                    <Checkbox
                      color={styles.logBox.backgroundColor}
                      id={`${item.id}-checkbox`}
                      value={deleteSelected.includes(item.id)}
                      onValueChange={(selected) =>
                        selected
                          ? setDeleteSelected([...deleteSelected, item.id])
                          : setDeleteSelected(
                              deleteSelected.filter((v) => v !== item.id)
                            )
                      }
                    />
                  </View>
                ) : null}
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
                      flex: 1,
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
              </View>
            );
          }}
        />
        {inDeleteMode ? (
          <Pressable
            onPress={
              deleteSelected.length > 0
                ? () => confirmRemoveListItem()
                : () => swapDeleteModeTo(false)
            }
            onLongPress={() => swapDeleteModeTo(false)}
          >
            <MaterialIcons
              size={65}
              name="remove-circle-outline"
              style={[{ marginStart: 'auto' }]}
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => handleAddItemPress()}
            onLongPress={() => swapDeleteModeTo(true)} // TODO: Animate this transition
          >
            <MaterialIcons
              size={65}
              name="add-circle-outline"
              style={[{ marginStart: 'auto' }]}
            />
          </Pressable>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
