import PatientsCard from "@/components/patients/PatientsCard";
import { MainHeader } from "@/components/themed/MainHeader";
import { PageView } from "@/components/themed/PageView";
import ScrollingTabs from "@/components/themed/ScrollingTabs";
import { SearchInput } from "@/components/themed/SearchInput";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { patients } from "@/mock/patients";

import { Button } from "@/components/themed/Button";
import { EmptyState } from "@/components/themed/EmptyState"; // import empty state
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function PatientsScreen() {
  const colorScheme = useColorScheme() ?? "light";

  const [activeTab, setActiveTab] = useState(1);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const scrollY = useSharedValue(0);

  const statusMap: Record<number, string | null> = {
    1: null, // All patients
    2: "active",
    3: "pending",
    4: "past",
  };

  const filtered = patients.filter((p) => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusMap[activeTab] ? p.status === statusMap[activeTab] : true;
    return matchesQuery && matchesStatus;
  });

  const pageSize = 10;
  const paginated = filtered.slice(0, page * pageSize);
  const hasMore = paginated.length < filtered.length;

  useEffect(() => {
    setPage(1);
  }, [query, activeTab]);

  const searchStyle = useAnimatedStyle(() => {
    const isScrollingDown = scrollY.value > 20;

    if (query.length > 0) {
      return {
        opacity: withTiming(1),
        height: withTiming(48),
        marginVertical: withTiming(12),
      };
    }

    return {
      opacity: withTiming(isScrollingDown ? 1 : 0),
      height: withTiming(isScrollingDown ? 48 : 0),
      marginVertical: withTiming(isScrollingDown ? 12 : 0),
    };
  });

  return (
    <PageView style={{ backgroundColor: Colors[colorScheme].bgGray }}>
      <MainHeader title="Patients" safeAreaTop />

      <ScrollingTabs
        tabs={[
          { label: "All patients" },
          { label: "Active" },
          { label: "Pending" },
          { label: "Past" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        fullWidth
      />

      <Animated.View style={[styles.searchWrap, searchStyle]}>
        <SearchInput
          placeholder="Search by patient"
          value={query}
          onChangeText={setQuery}
        />
      </Animated.View>

      {filtered.length === 0 ? (
        <EmptyState
          title="No patients found"
          description={
            query
              ? "No patients match your search."
              : "There are currently no patients."
          }
        />
      ) : (
        <FlatList
          data={paginated}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PatientsCard
              name={item.name}
              gender={item.gender}
              age={item.age}
              avatar={item.avatar}
            />
          )}
          contentContainerStyle={styles.listWrap}
          onScroll={(e) => {
            scrollY.value = e.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={16}
          ListFooterComponent={
            hasMore ? (
              <Button
                onPress={() => {
                  setLoadingMore(true);
                  setTimeout(() => {
                    setPage((prev) => prev + 1);
                    setLoadingMore(false);
                  }, 1000);
                }}
                loading={loadingMore}
                title="See more"
                style={{ width: 140, alignSelf: "center" }}
              />
            ) : null
          }
        />
      )}
    </PageView>
  );
}

const styles = StyleSheet.create({
  searchWrap: {
    paddingHorizontal: 12,
    overflow: "hidden",
  },
  listWrap: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 20,
  },
});
