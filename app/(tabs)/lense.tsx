import LenseTestResult from '@/components/lense-test-result';
import { defaultTheme } from '@/themes/default-theme';
import { LenseTests } from '@/types/lense-check';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function LenseScreen() {
  return (
    <View style={styles.lensScreen}>
      <Text style={{ ...styles.text }}>
        This is a collection of quick tests.
      </Text>
      <View style={styles.hr} />
      <View style={{ marginHorizontal: 'auto' }}>
        <FlatList
          data={LenseTests}
          renderItem={({ item, index }) => (
            <LenseTestResult key={index} checkToRun={item} itemHeight={80} />
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
});
