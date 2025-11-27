import { MainHeader } from '@/components/themed/MainHeader';
import { PageView } from '@/components/themed/PageView';
import { Text } from '@/components/themed/Text';
import { View, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ScheduleScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const appointments = [
    { id: 'a1', patient: 'John Smith', type: 'General Checkup', date: '31-11-2024', time: '09:30', status: 'Upcoming' },
    { id: 'a2', patient: 'Leslie Alexander', type: 'Dental', date: '30-11-2024', time: '13:15', status: 'Upcoming' },
    { id: 'a3', patient: 'Savannah Nguyen', type: 'Follow-up', date: '26-11-2024', time: '10:00', status: 'Completed' },
  ];

  return (
    <PageView useSafeArea>
      <MainHeader title="Schedule" />
      <View style={styles.container}>
        {appointments.map((appt) => (
          <View key={appt.id} style={[styles.card, { borderColor: theme.icon }]}> 
            <View style={styles.headerRow}>
              <IconSymbol name="calendar" size={18} color={theme.tabIconDefault} />
              <Text style={styles.dateText}>{appt.date} • {appt.time}</Text>
            </View>

            <Text type="subtitle" style={styles.title}>{appt.patient}</Text>
            <Text style={styles.type}>{appt.type}</Text>

            <View style={styles.footerRow}>
              <View style={[styles.badge, { backgroundColor: appt.status === 'Upcoming' ? theme.tabIconSelected : theme.icon }]}> 
                <Text style={styles.badgeText} lightColor="#fff" darkColor="#fff">{appt.status}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </PageView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    fontSize: 14,
  },
  title: {
    fontSize: 18,
  },
  type: {
    fontSize: 14,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  badge: {
    paddingHorizontal: 10,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

