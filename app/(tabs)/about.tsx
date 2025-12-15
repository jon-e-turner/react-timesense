import { defaultTheme } from '@/themes/default-theme';
import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultTheme.container.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#f0f0f0',
  },
});
