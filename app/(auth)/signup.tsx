import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/themed/Button';
import { MainHeader } from '@/components/themed/MainHeader';
import { PageView } from '@/components/themed/PageView';
import { Text } from '@/components/themed/Text';
import { TextField } from '@/components/themed/TextField';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignup = () => {
    setTimeout(() => {
      router.replace('/(auth)/login');
    }, 400);
  };

  return (
    <PageView useSafeArea>
      <MainHeader title="Create Account" />
      <View style={styles.container}>
        <Text style={styles.intro}>Create a new account to get started.</Text>

        <TextField placeholder="Full name" value={name} onChangeText={setName} />
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


          <Button variant="filled" title="Sign up" onPress={onSignup} />

        <View style={styles.footer}>
          <Text>Already have an account?</Text>
          <Link href="/(auth)/login">
            <Text type="link"> Sign in</Text>
          </Link>
        </View>
      </View>
    </PageView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  intro: {

    fontSize: 24,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
});