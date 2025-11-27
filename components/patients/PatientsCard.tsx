import { Text } from "@/components/themed/Text";
import { View } from "@/components/themed/View";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image, type ImageSource } from "expo-image";
import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
} from "react-native";
import InfoBrief from "./InfoBrief";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export type PatientsCardProps = {
  name: string;
  gender?: string;
  age?: number | string;
  avatar: ImageSource;
  onPress?: () => void;
  rightAccessory?: React.ReactNode;
  style?: any;
};

export default function PatientsCard({
  name,
  gender,
  age,
  avatar,
  onPress,
  rightAccessory,
  style,
}: PatientsCardProps) {
  const scheme = useColorScheme() ?? "light";
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
    onPress?.();
  };

  return (
    <View style={[styles.wrapper, style]}>
      {/* CARD */}
      <Pressable onPress={handleToggle} style={styles.pressable}>
        <View
          style={[styles.card, { backgroundColor: Colors[scheme].background }]}
        >
          <View style={styles.left}>
            <Image source={avatar} style={styles.avatar} />

            <View style={styles.texts}>
              <Text type="title" style={styles.name}>
                {name}
              </Text>

              <View style={styles.metaRow}>
                {!!gender && (
                  <Text
                    lightColor={Colors.light.tabIconDefault}
                    darkColor={Colors.dark.tabIconDefault}
                    style={styles.meta}
                  >
                    {gender}
                  </Text>
                )}
                {!!gender && !!age && <Text style={styles.dot}>•</Text>}
                {!!age && (
                  <Text
                    lightColor={Colors.light.tabIconDefault}
                    darkColor={Colors.dark.tabIconDefault}
                    style={styles.meta}
                  >
                    Age: {age}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={styles.right}>
            {rightAccessory ?? (
              <IconSymbol
                name={expanded ? "chevron.down" : "chevron.right"}
                color={Colors[scheme].icon}
                size={24}
              />
            )}
          </View>
        </View>
      </Pressable>

      {/* EXPANDING INFOBRIEF */}
      {expanded && (
        <View style={styles.infoWrapper}>
          <InfoBrief
            email="patient@example.com"
            lastAppointmentDate="26-11-2024"
            phone="0123456789"
            upcomingDate="27-11-2024"
            onViewProfile={() => {
              throw new Error("Failed to load patient profile");
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    overflow: "hidden", // ensures curve applies to entire block
    borderRadius: 16,
    marginBottom: 12,
  },
  pressable: {
    width: "100%",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  right: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  texts: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 20,
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  meta: {
    fontSize: 14,
  },
  dot: {
    fontSize: 14,
  },

  infoWrapper: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: "hidden",
  },
});
