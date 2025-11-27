import { Text } from '@/components/themed/Text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ms } from 'react-native-size-matters';

export interface TabT {
  label: string;
  count?: number | string;
  value?: any;
  disabled?: boolean;
  countBgcolor?: string;
  countTxcolor?: string;
}

interface ScrollingTabsProps {
  tabs: TabT[];
  activeTab: number;
  onChange: (tabId: number) => void;
  disableTabPressable?: boolean;
  fullWidth?: boolean;
}

const ScrollingTabs: React.FC<ScrollingTabsProps> = ({
  tabs,
  activeTab = 1,
  onChange,
  fullWidth = false,
  disableTabPressable,
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const scheme = useColorScheme();

  const scrollToTab = useCallback((index: number) => {
    scrollRef.current?.scrollTo({ x: index * ms(100), animated: true });
  }, []);

  useEffect(() => {
    scrollToTab(activeTab - 1);
  }, [activeTab, scrollToTab]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[scheme ?? 'light'].background,
          borderBottomColor: scheme === 'dark' ? '#1F2428' : '#C9D2DA',
        },
      ]}
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          fullWidth && styles.scrollContentFullWidth,
        ]}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === index + 1;

          return (
            <TouchableOpacity
              key={index}
              disabled={tab?.disabled || disableTabPressable}
              onPress={() => onChange(index + 1)}
              style={[styles.tab, fullWidth && { flex: 1 }]}
            >
              <View style={styles.tabInner}>
                <Text
                  style={styles.tabLabel}
                  lightColor={
                    isActive
                      ? Colors.light.primary
                      : Colors.light.secondaryText
                  }
                  darkColor={
                    isActive
                      ? Colors.dark.primary
                      : Colors.dark.secondaryText
                  }
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {tab.label}
                </Text>

                {!!tab?.count && (
                  <View
                    style={[
                      styles.count,
                      {
                        backgroundColor:
                          tab.countBgcolor || Colors[scheme ?? 'light'].tint,
                      },
                    ]}
                  >
                    <Text
                      style={styles.countText}
                      lightColor={tab.countTxcolor || '#fff'}
                      darkColor={tab.countTxcolor || '#fff'}
                    >
                      {Number(tab.count) > 99 ? '99+' : tab.count}
                    </Text>
                  </View>
                )}
              </View>

              {isActive && (
                <View
                  style={[
                    styles.underline,
                    { backgroundColor: Colors[scheme ?? 'light'].primary },
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ms(48),
    borderBottomWidth: 1,
    paddingBottom: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: ms(12),
    columnGap: ms(24),
  },
  scrollContentFullWidth: {
    width: '100%',
    justifyContent: 'space-evenly',
  },
  tab: {
    height: ms(48),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tabInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabLabel: {
    fontWeight: '600',
    fontSize: 14,
    flexShrink: 0,
  },
  underline: {
    position: 'absolute',
    bottom: 1,
    height: ms(3),
    width: '100%',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 1000,
  },
  count: {
    minWidth: ms(16),
    height: ms(16),
    paddingHorizontal: 4,
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: Platform.OS === 'ios' ? 14 : undefined,
  },
});

export default ScrollingTabs;
