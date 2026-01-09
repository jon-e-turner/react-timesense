import { defaultTheme } from '@/themes/default-theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

type TsEventDetailsProps = {
  tsEventId: number;
  detailsText?: string;
  handleDetailsChange: (text: string, id: number) => void;
};

export default function TsEventDetails({
  tsEventId,
  detailsText,
  handleDetailsChange,
}: TsEventDetailsProps) {
  const [isDirty, setIsDirty] = useState(false);

  const handleDetailsTextChange = (ignoreChanges: boolean = false) => {
    if (isDirty && !ignoreChanges) {
    }
  };

  const handleOnChangeText = (text: string) => {
    if (text === (detailsText ?? '')) {
      setIsDirty(false);
    } else {
      setIsDirty(true);
    }
  };

  return (
    <View
      style={{
        ...styles.wrapperCustom,
        ...styles.eliDetails,
      }}
    >
      <TextInput
        style={styles.eliDetailText}
        onSubmitEditing={({ nativeEvent: { text } }) =>
          handleDetailsChange(text, tsEventId)
        }
        onChangeText={(text) => handleOnChangeText(text)}
        multiline={true}
        numberOfLines={3}
        editable={true}
        autoFocus={true}
        inputMode="text"
        value={detailsText ?? undefined}
        placeholder={'Romanes eunt domus'}
        placeholderTextColor={'#a0a0a0'}
        enterKeyHint="done"
        submitBehavior="newline"
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.submitButton}
          onPress={() => handleDetailsTextChange()}
        >
          <MaterialIcons style={styles.submitButton} name="done" />
        </Pressable>
        {isDirty ? (
          <Pressable
            style={styles.closeButton}
            onPress={() => handleDetailsTextChange(true)}
          >
            <MaterialIcons style={styles.closeButton} name={'delete'} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...defaultTheme,
  eliDetails: {
    backgroundColor: '#0c2645',
    minHeight: 50,
    flexDirection: 'row',
    flex: 1,
  },
  eliDetailText: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: '#0c2645',
    color: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginEnd: 4,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  closeButton: {
    backgroundColor: '#560000c0',
    color: '#f0f0f0c0',
    fontSize: 24,
  },
  submitButton: {
    backgroundColor: '#074c07c0',
    color: '#f0f0f0c0',
    fontSize: 24,
  },
});
