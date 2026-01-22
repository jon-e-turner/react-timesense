import { MaterialIcons } from '@expo/vector-icons';
import { PropsWithChildren } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

type Props = PropsWithChildren<{
  isVisible: boolean;
  messageType?: 'info' | 'warning' | 'error';
  title?: string;
  onRequestClose: () => void;
}>;

export default function MessageModal({
  isVisible,
  title,
  messageType = 'info',
  children,
  onRequestClose,
}: Props) {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onRequestClose}
      transparent={true}
      visible={isVisible}
    >
      <View role="alertdialog" style={styles.messageModal}>
        <View role="heading" style={styles.headerRow}>
          <MaterialIcons
            role="img"
            aria-label={messageType}
            name={messageType}
            style={iconStyle(messageType)}
          />
          <Text style={styles.titleText}>{title}</Text>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const iconStyle = (messageType: 'info' | 'warning' | 'error') => {
  switch (messageType) {
    case 'info':
      return styles.infoIcon;
    case 'warning':
      return styles.warningIcon;
    case 'error':
      return styles.errorIcon;
  }
};

const styles = StyleSheet.create({
  messageModal: {
    minHeight: '25%',
    width: '85%',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#303030',
  },
  headerRow: {
    flex: 1,
    height: '16%',
    backgroundColor: '#004a77',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoIcon: {
    color: '#0072ba',
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
  titleText: {
    flexGrow: 1,
    fontSize: 32,
  },
});
