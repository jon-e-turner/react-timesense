import { defaultTheme } from '@/themes/default-theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

type TsEventDetailsProps = {
  tsEventId: number;
  detailsText?: string;
  handleDetailsChange: (id: number, prop?: string, newValue?: string) => void;
};

export default function TsEventDetails({
  tsEventId,
  detailsText,
  handleDetailsChange,
}: TsEventDetailsProps) {
  const [hasChanges, setHasChanges] = useState(false);
  const [text, setText] = useState<string>(detailsText ?? '');

  const handleDetailsTextChange = (ignoreChanges: boolean = false) => {
    if (hasChanges && !ignoreChanges) {
      handleDetailsChange(tsEventId, 'details', text);
    } else {
      handleDetailsChange(tsEventId, undefined, undefined);
    }
    setHasChanges(false);
  };

  const handleOnChangeText = (newText: string) => {
    if (newText === (detailsText ?? '')) {
      setHasChanges(false);
    } else {
      setHasChanges(true);
    }

    setText(newText);
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
        onChangeText={(text) => handleOnChangeText(text)}
        multiline={true}
        numberOfLines={3}
        editable={true}
        autoFocus={true}
        inputMode="text"
        value={text}
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
        <Pressable
          style={styles.closeButton}
          onPress={() => handleDetailsTextChange(true)}
        >
          <MaterialIcons
            style={styles.closeButton}
            name={hasChanges ? 'delete' : 'close'}
          />
        </Pressable>
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
    justifyContent: 'space-evenly',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  closeButton: {
    backgroundColor: '#560000',
    color: '#f0f0f0',
    fontSize: 24,
    margin: 2,
  },
  submitButton: {
    backgroundColor: '#074c07',
    color: '#f0f0f0',
    fontSize: 24,
    margin: 2,
  },
});
