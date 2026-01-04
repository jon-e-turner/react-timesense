import { defaultTheme } from '@/themes/default-theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';

const ITEM_HEIGHT = 80;

// Before adding this to main, write tests, get a reporting API set up, and then point this page at it.
const DATA = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
];

export default function LenseScreen() {
  const [data, setData] = useState<boolean[]>(DATA);

  const handleResponseBoxOnPress = (evt: GestureResponderEvent) => {};

  return (
    <View style={styles.lensScreen}>
      <Text style={{ ...styles.text }}>
        This is a collection of quick tests.
      </Text>
      <View style={styles.hr} />
      <View style={{ marginHorizontal: 'auto' }}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <Pressable
              // These functions currently have a huge effect and trigger too many renders.
              // onPointerEnter={() => setUnderPointer(index)}
              // onPointerLeave={() => setUnderPointer(undefined)}
              onPress={handleResponseBoxOnPress}
              style={({ pressed }) => [
                {
                  ...styles.responseBox,
                  borderColor: pressed ? '#ffd33d' : '#25292e',
                },
              ]}
            >
              <MaterialCommunityIcons
                key={index}
                style={{
                  ...styles.responseIcon,
                  color: item ? 'green' : 'white',
                }}
                name={item ? 'heart' : 'heart-broken'}
              />
            </Pressable>
          )}
          numColumns={5}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lensScreen: {
    backgroundColor: defaultTheme.container.backgroundColor,
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: '#f0f0f0',
    padding: 8,
    textAlign: 'center',
  },
  hr: {
    borderBottomColor: '#25292e',
    borderBottomWidth: 8,
    marginStart: '7.5%', // Should always be half of 100 - width
    width: '85%',
    padding: 4,
  },
  responseBox: {
    backgroundColor: '#25292e',
    height: ITEM_HEIGHT,
    width: ITEM_HEIGHT,
    justifyContent: 'flex-start',
    borderWidth: 2,
    margin: 4,
  },
  responseIcon: {
    fontSize: ITEM_HEIGHT * 0.85,
    margin: 'auto',
  },
});
