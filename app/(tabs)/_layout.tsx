import { defaultTheme as styles } from '@/themes/default-theme';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: styles.tabBar.color,
        headerStyle: {
          backgroundColor: styles.tabBarHeader.backgroundColor,
        },
        headerShadowVisible: true,
        headerTintColor: styles.tabBarHeader.color,
        tabBarStyle: {
          backgroundColor: styles.tabBar.backgroundColor,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'TimeSense',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? 'star' : 'star-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="animations"
        options={{
          title: 'Animations',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'animation-play' : 'animation-play-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? 'info' : 'info-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
