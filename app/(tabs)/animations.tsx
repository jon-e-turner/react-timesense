import { defaultTheme } from '@/themes/default-theme';
import React, { useState } from 'react';
import { Button, Easing, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Circle, Svg } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Animations() {
  const r = useSharedValue<number>(20);
  const [grow, setGrow] = useState<boolean>(false);

  const handleButtonPress = () => {
    setGrow(true);
    r.value += 10;
  };

  const handleShapePress = () => {
    setGrow(false);
    if (r.value > 20) {
      r.value = 20;
    }
  };

  const animatedProps = useAnimatedProps(() => ({
    r: withTiming(r.value, {
      easing: Easing.out(Easing.back(grow ? 0 : 2)),
    }),
  }));

  return (
    <View style={styles.container}>
      <Svg style={styles.svg}>
        <AnimatedCircle
          cx="50%"
          cy="50%"
          fill="#ffd33d"
          animatedProps={animatedProps}
          onPress={handleShapePress}
        />
      </Svg>
      <Button onPress={handleButtonPress} title="GROW" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...defaultTheme.container,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  svg: {
    height: 250,
    width: '100%',
  },
});
