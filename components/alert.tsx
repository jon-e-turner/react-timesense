// Source - https://stackoverflow.com/a/78979536
// Posted by devnik
// Retrieved 2026-01-10, License - CC BY-SA 4.0

import { Alert, Platform } from 'react-native';

const alertPolyfill = (
  title: string,
  description: string,
  options: {
    text: string;
    onPress: () => void;
    style?: string;
  }[]
) => {
  const result = window.confirm(
    [title, description].filter(Boolean).join('\n')
  );

  if (result) {
    const confirmOption = options.find(({ style }) => style !== 'cancel');
    confirmOption && confirmOption.onPress();
  } else {
    const cancelOption = options.find(({ style }) => style === 'cancel');
    cancelOption && cancelOption.onPress();
  }
};

const alert = Platform.OS === 'web' ? alertPolyfill : Alert.alert;

export default alert;
