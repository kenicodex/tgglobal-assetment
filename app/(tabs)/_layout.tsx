import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Import SVGs directly as components
import HomeIcon from '@/assets/svgs/home.svg';
import PatientsIcon from '@/assets/svgs/patients.svg';
import ProfileIcon from '@/assets/svgs/profile.svg';
import RecordsIcon from '@/assets/svgs/records.svg';
import ScheduleIcon from '@/assets/svgs/schedule.svg';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const icons = {
    home: HomeIcon,
    patients: PatientsIcon,
    schedule: ScheduleIcon,
    records: RecordsIcon,
    profile: ProfileIcon,
  } as const;

  const icon = (name: keyof typeof icons, color: string) => {
    const SvgIcon = icons[name];
    return <SvgIcon width={24} height={24} color={color} />;
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#20BEB8' ,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: { fontSize: 12, fontWeight: 400 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: ({ color }) => icon('home', color) }}
      />
      <Tabs.Screen
        name="patients"
        options={{ title: 'Patients', tabBarIcon: ({ color }) => icon('patients', color) }}
      />
      <Tabs.Screen
        name="schedule"
        options={{ title: 'Schedule', tabBarIcon: ({ color }) => icon('schedule', color) }}
      />
      <Tabs.Screen
        name="records"
        options={{ title: 'Records', tabBarIcon: ({ color }) => icon('records', color) }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ color }) => icon('profile', color) }}
      />
    </Tabs>
  );
}
