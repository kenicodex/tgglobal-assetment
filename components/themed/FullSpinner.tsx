import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { ActivityIndicator, StyleSheet, TextStyle, View } from 'react-native';
import { Text } from './Text';

export const LoaderScreen = ({
  message,
  messageStyle,
  color,
}: {
  message?: string;
  messageStyle?: TextStyle;
  color?: string;
}) => {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={color ?? theme.primary}
      />

      {message ? (
        <Text
          style={[
            { color: theme.text, marginVertical: 10 },
            messageStyle,
          ]}
        >
          {message}
        </Text>
      ) : null}
    </View>
  );
};

export const FullSpinner = ({
  visible,
  message,
}: {
  visible?: boolean;
  message?: string;
}) => {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];

  if (!visible) return null;

  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor:
            scheme === 'dark'
              ? 'rgba(0,0,0,0.6)'
              : 'rgba(0,0,0,0.3)',
          position: 'absolute',
          zIndex: 999,
        },
      ]}
    >
      <LoaderScreen message={message} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
