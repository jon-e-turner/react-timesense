import { StyleSheet } from 'react-native';

export const defaultTheme = StyleSheet.create({
  button: {},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#004a77',
    padding: 4,
  },
  tsEventsListRow: {
    flexDirection: 'row',
    flex: 1,
  },
  removeItemColumn: {
    justifyContent: 'center',
  },
  modalText: {
    color: '#a0a0a0',
    fontSize: 20,
    justifyContent: 'center',
    paddingTop: 8,
  },
  modalButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 'auto',
    alignItems: 'flex-end',
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 4,
    margin: 4,
  },
  loadingScreen: {
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
  messageModal: {
    minHeight: '25%',
    width: '85%',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#26292e',
    margin: 'auto',
  },
  modalHeaderRow: {
    backgroundColor: '#0072ba',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBodyRow: {
    flex: 1,
    flexDirection: 'column',
  },
  infoIcon: {
    color: '#26292e',
    fontSize: 28,
  },
  warningIcon: {
    color: '#ffd33d',
    fontSize: 28,
  },
  errorIcon: {
    color: '#ffd33d',
    fontSize: 28,
  },
  modalTitleText: {
    flex: 1,
    fontSize: 26,
    paddingStart: 4,
  },
});
