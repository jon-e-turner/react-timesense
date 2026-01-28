import { defaultTheme as styles } from '@/themes/default-theme';
import { MaterialIcons } from '@expo/vector-icons';
import { PropsWithChildren } from 'react';
import { Modal, Text, View } from 'react-native';

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
      <View
        role="alertdialog"
        style={styles.messageModal}
      >
        <View
          role="heading"
          style={styles.modalHeaderRow}
        >
          <MaterialIcons
            role="img"
            aria-label={messageType}
            name={messageType}
            style={iconStyle(messageType)}
          />
          <Text style={styles.modalTitleText}>{title}</Text>
        </View>
        <View style={styles.modalBodyRow}>{children}</View>
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
