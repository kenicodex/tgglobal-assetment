import Calender from "@/assets/svgs/schedule.svg";
import { Text } from "@/components/themed/Text";
import { View } from "@/components/themed/View";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button } from "../themed/Button";

export type ConsultationNote = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export type ConsultationNotesProps = {
  header?: string;
  notes: ConsultationNote[];
  onViewFullNote?: (id: string) => void;
  style?: any;
};

export default function ConsultationNotes({
  header = "Consultation notes",
  notes,
  onViewFullNote,
  style,
}: ConsultationNotesProps) {
  const colorScheme = useColorScheme();


  return (
    <View style={[styles.container, style]}>
      <Text type="title" style={styles.header}>
        {header}
      </Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: Colors[colorScheme ?? "light"].background },
            ]}
          >
            <Text type="subtitle" style={styles.cardTitle}>
              {item.title}
            </Text>
            <Text style={styles.cardDesc}>{item.description}</Text>

            <View style={styles.dateRow}>
             <Calender width={16} height={16} color={Colors[colorScheme ?? "light"].info}   />
              <Text
                lightColor={Colors.light.tabIconDefault}
                darkColor={Colors.dark.tabIconDefault}
                style={styles.dateText}
              >
                {item.date}
              </Text>
            </View>

            <Button
              onPress={() => onViewFullNote?.(item.id)}
              color="primary"
              variant="outlined"
              title="  View Full Note"
              style={{borderRadius:100}}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingHorizontal: 8,
    paddingTop: 8,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  header: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
  },
  listContent: {
    gap: 12,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  cardTitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  cardDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateText: {
    fontSize: 14,
  },
  cta: {
    marginTop: 8,
    height: 44,
    borderWidth: 1.5,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
