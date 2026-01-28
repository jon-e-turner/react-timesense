import { defaultTheme as styles } from '@/themes/default-theme';
import { Text, View } from 'react-native';

export default function LoadingScreen() {
  return (
    <View
      aria-label="loading"
      style={styles.loadingScreen}
    >
      <Text style={styles.loadingScreenText}>Loading...</Text>
    </View>
  );
}
