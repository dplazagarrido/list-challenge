import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ListRenderItemInfo,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../store/slices/authSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { usePokeData } from "../hooks/usePokeData";
import { colors, spacing, borderRadius } from "../constants/theme";
import PokeListItem from "../components/PokeListItem";
import { PokeItem } from "../types";

const ITEM_HEIGHT = 49;

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = usePokeData();
  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    dispatch(logout());
  };

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [items, search]);

  const getItemLayout = useCallback(
    (_: ArrayLike<PokeItem> | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<PokeItem>) => <PokeListItem item={item} />,
    [],
  );

  const keyExtractor = useCallback(
    (item: PokeItem, index: number) => `${item.type}-${item.name}-${index}`,
    [],
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>
          Cargando {"\u00b1"}2900 elementos...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>PokéDex</Text>
          <Text style={styles.subtitle}>{filteredItems.length} elementos</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        placeholderTextColor={colors.textSecondary}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        windowSize={10}
        maxToRenderPerBatch={20}
        initialNumToRender={20}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  errorText: {
    color: colors.primary,
    fontSize: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.l,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.l,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.m,
  },
  logoutText: {
    color: colors.surface,
    fontWeight: "600",
    fontSize: 14,
  },
  searchInput: {
    margin: spacing.l,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.m,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
});

export default HomeScreen;
