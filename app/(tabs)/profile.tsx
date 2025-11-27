import { Button } from "@/components/themed/Button";
import { MainHeader } from "@/components/themed/MainHeader";
import { PageView } from "@/components/themed/PageView";
import { Text } from "@/components/themed/Text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const user = {
    name: 'Dr. Jane Doe',
    role: 'General Practitioner',
    email: 'jane.doe@clinic.com',
    phone: '(555) 123-4567',
    avatar: require('../../assets/images/react-logo.png'),
  };

  return (
    <PageView useSafeArea>
      <MainHeader title="Profile" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={user.avatar} style={styles.avatar} />
          <View style={styles.info}>
            <Text type="title" style={styles.name}>{user.name}</Text>
            <Text style={styles.role}>{user.role}</Text>
            <Text style={styles.meta}>{user.email}</Text>
            <Text style={styles.meta}>{user.phone}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button variant="outlined" title="Edit Profile" />
          <Button variant="filled" title="Log Out" onPress={() => router.replace('/(auth)/login')} />
        </View>
      </View>
    </PageView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 16,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 20,
    lineHeight: 24,
  },
  role: {
    fontSize: 14,
  },
  meta: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
});
