import { Colors } from "@/constants/theme";
import React from "react";
import { View as RNView, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "./View";

export function PageView(
  props: RNView["props"] & {
    useSafeArea?: boolean;
    useSafeAreaTop?: boolean;
    useSafeAreaBottom?: boolean;
    bgColor?: string;
  }
) {
  const {
    style,
    useSafeArea,
    useSafeAreaTop,
    useSafeAreaBottom,
    bgColor,
    ...otherProps
  } = props;

  const { top, bottom } = useSafeAreaInsets();
  const colorScheme = useColorScheme() || "light";

  const backgroundColor = bgColor
    ? bgColor
    : Colors[colorScheme || "light"].background;

  const safeAreaSpacing = React.useMemo(() => {
    if (useSafeArea) {
      return { paddingTop: top, paddingBottom: bottom };
    }
    if (useSafeAreaTop) {
      return { paddingTop: top };
    }
    if (useSafeAreaBottom) {
      return { paddingBottom: bottom };
    }
    return {};
  }, [bottom, top, useSafeArea, useSafeAreaBottom, useSafeAreaTop]);

  return (
    <View
      style={[{ flex: 1, backgroundColor }, style, { ...safeAreaSpacing }]}
      {...otherProps}
    />
  );
}
