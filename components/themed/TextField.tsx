// components/ThemedTextField.tsx
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TextInputProps,
} from 'react-native';
import { View } from './View';

export interface TextFieldProps extends TextInputProps {
  leftIcon?: React.ReactNode;
}

export function TextField({
  style,
  leftIcon,
  placeholder,
  ...rest
}: TextFieldProps) {
  const theme = useColorScheme() ?? 'light';
  const [focused, setFocused] = useState(false);

  const themeColors = Colors[theme];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColors.background,
          borderColor: focused ? themeColors.primary : themeColors.icon,
        },
      ]}
    >
      {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={themeColors.icon}
        style={[
          styles.input,
          { color: themeColors.text },
          style,
        ]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 44,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
});
