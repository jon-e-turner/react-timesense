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
    padding: 4,
    margin: 4,
  },
  loadingScreen: {
    // alignContent: 'center',
    backgroundColor: '#004a77',
    flex: 1,
    justifyContent: 'center',
  },
  loadingScreenText: {
    color: '#ffd33d',
    fontSize: 36,
    fontStyle: 'italic',
    marginStart: 'auto',
    marginEnd: 'auto',
  },
  logBox: {
    padding: 20,
    margin: 10,
    backgroundColor: '#0072ba',
  },
});
