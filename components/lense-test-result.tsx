import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  type GestureResponderEvent,
} from 'react-native';
import type { LenseCheck } from '../types/lense-check';

type Props = {
  itemHeight: number;
  checkToRun: LenseCheck;
};

export default function LenseTestResult({ itemHeight, checkToRun }: Props) {
  const handleResponseBoxOnPress = (evt: GestureResponderEvent) => {
    setResult(checkToRun.check);
  };

  const [result, setResult] = useState<boolean>();

  useEffect(() => {
    setResult(checkToRun.check);
  }, [setResult, checkToRun]);

  return (
    <Pressable
      aria-label={`Check: ${checkToRun.label}, Result: ${result}`}
      onPress={handleResponseBoxOnPress}
      style={({ pressed }) => [
        {
          ...styles.responseBox,
          height: itemHeight,
          width: itemHeight,
          borderColor: pressed ? '#ffd33d' : styles.responseBox.backgroundColor,
        },
      ]}
    >
      <MaterialCommunityIcons
        style={{
          ...styles.responseIcon,
          fontSize: itemHeight * 0.85,
          color: result ? 'green' : 'white',
        }}
        name={result ? 'heart' : 'heart-broken'}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  responseBox: {
    backgroundColor: '#25292e',
    justifyContent: 'flex-start',
    borderWidth: 2,
    margin: 4,
  },
  responseIcon: {
    margin: 'auto',
  },
});
