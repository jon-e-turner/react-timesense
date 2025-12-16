import { MaterialIcons } from '@expo/vector-icons';
import { PropsWithChildren } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

type Props = PropsWithChildren<{
  isVisible: boolean;
  messageType: 'info' | 'warning' | 'error';
  title?: string;
  onClose: () => void;
}>;

export default function MessageModal({
  isVisible,
  title,
  messageType = 'info',
  children,
  onClose,
}: Props) {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.messageModal}>
        <View style={styles.headerRow}>
          <MaterialIcons name={messageType} style={iconStyle(messageType)} />
          <Text style={styles.titleText}>{title}</Text>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const iconStyle = (messageType: 'info' | 'warning' | 'error') => {
  const iconColor = {
    info: '#0072ba',
    warning: '#ffd33d',
    error: '#ffd33d',
  };

  return { fontSize: 28, color: iconColor[messageType] };
};

const styles = StyleSheet.create({
  messageModal: {
    minHeight: '25%',
    width: '85%',
    alignContent: 'center',
    backgroundColor: '#303030c0',
  },
  headerRow: {
    height: '16%',
    backgroundColor: '#004a77c0',
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
