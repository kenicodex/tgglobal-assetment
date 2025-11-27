import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/themed/Button';
import { FullSpinner } from '@/components/themed/FullSpinner';
import { MainHeader } from '@/components/themed/MainHeader';
import { PageView } from '@/components/themed/PageView';
import { Text } from '@/components/themed/Text';
import { TextField } from '@/components/themed/TextField';

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1000);
  };

  return (
    <>
      <PageView useSafeArea>
        <MainHeader title="Login" />

        <View style={styles.container}>
          <Text style={styles.intro}>Welcome back.</Text>

          <View style={{ gap: 18 }}>
            <TextField
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextField
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Button variant="filled" title="Login" onPress={onLogin} />

          <View style={styles.footer}>
            <Text>Don&apos;t have an account?</Text>
            <Link href="/(auth)/signup">
              <Text type="link"> Create one</Text>
            </Link>
          </View>
        </View>
      </PageView>

      {/* Spinner Overlay */}
      <FullSpinner visible={loading} message="Logging in..." />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  intro: {
    fontSize: 24,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
});
