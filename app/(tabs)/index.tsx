import { HelloWave } from "@/components/hello-wave";
import { MainHeader } from "@/components/themed/MainHeader";
import { PageView } from "@/components/themed/PageView";
import { Text } from "@/components/themed/Text";
import { View } from "@/components/themed/View";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <PageView useSafeArea>
      <MainHeader title="Home" />
      <View style={styles.content}>
        <HelloWave />
        <Text type="title" style={styles.title}>Welcome to TGlobal</Text>
        <Text style={styles.subtitle}>
          Manage patients, schedules, and records from the tabs below.
        </Text>
      </View>
    </PageView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
  },
});
