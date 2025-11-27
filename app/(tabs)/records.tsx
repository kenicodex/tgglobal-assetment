import { MainHeader } from "@/components/themed/MainHeader";
import { PageView } from "@/components/themed/PageView";
import { Text } from '@/components/themed/Text';
import { View, StyleSheet } from 'react-native';
import { Collapsible } from '@/components/ui/collapsible';

export default function RecordsScreen() {
  const records = [
    { id: 'r1', title: 'Blood Test', date: '20-11-2024', summary: 'CBC normal. Hemoglobin within range. Platelets normal.' },
    { id: 'r2', title: 'X-Ray Chest', date: '05-11-2024', summary: 'No acute cardiopulmonary process. Clear lung fields.' },
    { id: 'r3', title: 'Prescription', date: '26-11-2024', summary: 'Metformin 500mg BID. Continue regimen; review in 4 weeks.' },
  ];

  return (
    <PageView useSafeArea>
      <MainHeader title="Records" />
      <View style={styles.container}>
        {records.map((rec) => (
          <View key={rec.id} style={styles.card}> 
            <Text type="subtitle" style={styles.title}>{rec.title}</Text>
            <Text style={styles.date}>{rec.date}</Text>
            <Collapsible title="Details">
              <Text style={styles.summary}>{rec.summary}</Text>
            </Collapsible>
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
    borderColor: '#ECEFF1',
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  title: {
    fontSize: 18,
  },
  date: {
    fontSize: 14,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
  },
});

