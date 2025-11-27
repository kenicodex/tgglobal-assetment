/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FFFFFF',
    bgGray: '#F2F5F8',
    info: '#009AFF',

    // Primary Variant
    primary: '#20BEB8',
    primaryText: '#FFFFFF',


    // Secondary Variant
    secondary: '#F2F5F8',
    secondaryText: '#11181C',

    // Danger Variant
    danger: '#DC3545',
    dangerText: '#FFFFFF',

    // Neutral Variant
    neutral: '#E5E5E5',
    neutralText: '#11181C',

    // UI Icons
    icon: '#687076',

    // Tabs
    tabIconDefault: '#94A3B8',
    tabIconSelected: '#20BEB8',

    // Tint
    tint: tintColorLight,
  },

  dark: {
    text: '#ECEDEE',
    background: '#151718',
    bgGray: '#282828ff',
    info: '#009AFF',

    // Primary Variant
    primary: '#20BEB8',
    primaryText: '#FFFFFF',

    // Secondary Variant
    secondary: '#2A2D30',
    secondaryText: '#ECEDEE',

    // Danger Variant
    danger: '#FF6B6B',
    dangerText: '#FFFFFF',

    // Neutral Variant
    neutral: '#3A3A3A',
    neutralText: '#ECEDEE',

    // UI Icons
    icon: '#9BA1A6',

    // Tabs
    tabIconDefault: '#94A3B8',
    tabIconSelected: '#20BEB8',

    // Tint
    tint: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
