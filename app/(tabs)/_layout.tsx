import { defaultTheme } from '@/themes/default-theme';
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: defaultTheme.container.backgroundColor,
        },
        headerShadowVisible: false,
        headerTintColor: '#f0f0f0',
        tabBarStyle: {
          backgroundColor: defaultTheme.container.backgroundColor,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Events',
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
