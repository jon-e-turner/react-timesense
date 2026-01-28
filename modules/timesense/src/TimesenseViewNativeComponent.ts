import {
  codegenNativeComponent,
  type ColorValue,
  type ViewProps,
} from 'react-native';

export interface NativeProps extends ViewProps {
  color?: ColorValue;
}

export default codegenNativeComponent<NativeProps>('TimesenseView');
