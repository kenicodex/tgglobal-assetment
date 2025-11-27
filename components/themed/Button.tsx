import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle,
} from 'react-native';

type ColorType = 'primary' | 'secondary' | 'danger' | 'neutral' | 'natural';
type Variant = 'filled' | 'outlined' | 'text' | 'standard';

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  color?: ColorType;      // renamed from variant
  variant?: Variant;      // new variants
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  color = 'primary',
  variant = 'filled',
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const theme = useColorScheme() ?? 'light';
  const colorSet = Colors[theme];

  // Map colors
  const colorMap = {
    primary: { bg: colorSet.primary, text: colorSet.primaryText },
    secondary: { bg: colorSet.secondary, text: colorSet.secondaryText },
    danger: { bg: colorSet.danger, text: colorSet.dangerText },
    neutral: { bg: colorSet.neutral, text: colorSet.neutralText },
    natural: { bg: 'transparent', text: colorSet.text },
  };

  const { bg, text } = colorMap[color];

  // Apply variant logic
  const variantStyle = {
    filled: {
      backgroundColor: bg,
      borderColor: 'transparent',
      borderWidth: 0,
      textColor: text,
    },

    outlined: {
      backgroundColor: 'transparent',
      borderColor: bg,
      borderWidth: 1.6,
      textColor: bg,
    },

    text: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 0,
      textColor: bg,
    },

    standard: {
      backgroundColor: color === 'natural' ? 'transparent' : bg + '20', // 20 = opacity
      borderColor: 'transparent',
      borderWidth: 0,
      textColor: bg,
    },
  };

  const applied = variantStyle[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: applied.backgroundColor,
          borderColor: applied.borderColor,
          borderWidth: applied.borderWidth,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={applied.textColor} />
      ) : (
        <>
          {leftIcon && leftIcon}

          {title && (
            <Text
              style={[
                styles.text,
                { color: applied.textColor },
                textStyle,
              ]}
            >
              {title}
            </Text>
          )}

          {rightIcon && rightIcon}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
});
