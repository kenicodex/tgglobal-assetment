import { Text } from '@/components/themed/Text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image, type ImageSource } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface EmptyStateProps {
  title?: string;
  description?: string;
  image?: ImageSource;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nothing here yet",
  description = "There is no data to display at the moment.",
  image,
}) => {
  const theme = useColorScheme() ?? 'light';
  const themeColors = Colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {image && <Image source={image} style={styles.image} />}
      <Text style={[styles.title, { color: themeColors.text }]}>
        {title}
      </Text>
      <Text style={[styles.description, { color: themeColors.text }]}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
});
