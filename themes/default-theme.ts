import { StyleSheet } from 'react-native';

export const defaultTheme = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#004a77',
    padding: 4,
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
    margin: 4,
  },
  logBox: {
    padding: 20,
    margin: 10,
    backgroundColor: '#0072ba',
  },
  tabBar: {
    color: '#ffd33d',
    backgroundColor: '#25292e',
  },
  tabBarHeader: {
    color: '#f0f0f0',
    backgroundColor: '#25292e',
  },
});
