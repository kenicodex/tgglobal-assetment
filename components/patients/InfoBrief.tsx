import PhoneIcon from "@/assets/svgs/patients/call.svg";
import EmailIcon from "@/assets/svgs/patients/elements.svg";
import { callNumber, sendEmail } from "@/common";
import { Button } from "@/components/themed/Button";
import { Text } from "@/components/themed/Text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import ConsultationNotes, { ConsultationNote } from "./ConsultationNotes";

export type PatientExtraInfoProps = {
  lastAppointmentDate: string;
  upcomingDate: string;
  phone: string;
  email: string;
  onViewProfile?: () => void;
  notes?: ConsultationNote[];
};

export default function PatientExtraInfo({
  lastAppointmentDate,
  upcomingDate,
  phone,
  email,
  onViewProfile,
  notes,
}: PatientExtraInfoProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);

  const defaultNotes: ConsultationNote[] = [
    {
      id: "n1",
      title: "Getting better",
      description:
        "Patient reports improved glucose control. A1C decreased from 7.2 to 6.8. Maintaining current medication regimen. Encouraged continued dietary compliance and regular exercise.",
      date: lastAppointmentDate,
    },
    {
      id: "n2",
      title: "Getting better",
      description:
        "Patient reports improved glucose control. A1C decreased from 7.2 to 6.8. Maintaining current medication regimen. Encouraged continued dietary compliance and regular exercise.",
      date: upcomingDate,
    },
  ];

  const openNotesSheet = () => {
    setLoadingNotes(true);
    setTimeout(() => {
      setLoadingNotes(false);
      actionSheetRef.current?.show();
    }, 1500);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.infoRow}>
        <View style={[styles.infoBox, { backgroundColor: theme.secondary }]}>
          <View style={styles.infoHeader}>
            <IconSymbol
              name="calendar"
              size={18}
              color={theme.tabIconDefault}
            />
            <Text style={styles.infoLabel}>Last appointment</Text>
          </View>
          <Text style={styles.infoValue}>{lastAppointmentDate}</Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: theme.secondary }]}>
          <View style={styles.infoHeader}>
            <IconSymbol name="clock" size={18} color="#45C28E" />
            <Text style={styles.infoLabel}>Upcoming</Text>
          </View>
          <Text style={styles.infoValue}>{upcomingDate}</Text>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <View>
          <Text type="default" style={{ fontSize: 18 }}>
            Contact Information
          </Text>
        </View>
        <View style={styles.contactRow}>
          <PhoneIcon width={18} height={18} />
          <Text
            style={[styles.contactText, { color: theme.tabIconDefault }]}
            onPress={() => callNumber(phone)}
          >
            {phone}
          </Text>
        </View>
        <View style={styles.contactRow}>
          <EmailIcon width={18} height={18} />
          <Text
            style={[styles.contactText, { color: theme.tabIconDefault }]}
            onPress={() => sendEmail(email)}
          >
            {email}
          </Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <Button
          style={{ width: "49%", borderRadius: 100 }}
          title="View profile"
          variant="outlined"
          onPress={onViewProfile}
        />

        <Button
          style={{ width: "49%", borderRadius: 100 }}
          variant="filled"
          loading={loadingNotes}
          title="Consultation Notes"
          onPress={openNotesSheet}
        />
      </View>

      {/* Render Notes below buttons to use inside ActionSheet */}
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{ backgroundColor: theme.background }}
      >
        <ConsultationNotes notes={notes ?? defaultNotes} />
      </ActionSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -16,
    borderRadius: 12,
    padding: 12,
    position: "relative",
    zIndex: -1,
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
  },
  infoBox: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contactWrap: {
    gap: 6,
  },
  contactText: {
    fontSize: 16,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 12,
    justifyContent: "space-evenly",
  },
});
