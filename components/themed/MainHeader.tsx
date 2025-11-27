import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MainHeaderProps {
  title?: string;
  leftIcon?: React.ReactNode;
  onLeftPress?: () => void;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  safeAreaTop?: boolean;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  title,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
  style,
  titleStyle,
  safeAreaTop = false, // default false
}) => {
  const theme = useColorScheme() ?? 'light';
  const themeColors = Colors[theme];
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColors.background,
          paddingTop: safeAreaTop ? insets.top : 0,
        },
        style,
      ]}
    >
      {/* Left Icon */}
      {leftIcon ? (
        <TouchableOpacity onPress={onLeftPress} style={styles.leftIcon}>
          {leftIcon}
        </TouchableOpacity>
      ) : (
        <View style={styles.leftIcon} />
      )}

      {/* Title */}
      {title && (
        <Text style={[styles.title, { color: themeColors.text }, titleStyle]}>
          {title}
        </Text>
      )}

      {/* Right Icon */}
      {rightIcon ? (
        <TouchableOpacity onPress={onRightPress} style={styles.rightIcon}>
          {rightIcon}
        </TouchableOpacity>
      ) : (
        <View style={styles.rightIcon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftIcon: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightIcon: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
});
