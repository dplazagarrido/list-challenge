import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PokeItem, PokeItemType } from "../types";
import { borderRadius, colors, spacing } from "../constants/theme";

const TYPE_CONFIG: Record<PokeItemType, { color: string; label: string }> = {
  pokemon: { color: colors.pokemon, label: "Pokémon" },
  move: { color: colors.move, label: "Move" },
  item: { color: colors.item, label: "Item" },
};

interface Props {
  item: PokeItem;
}

const PokeListItem = ({ item }: Props) => {
  const config = TYPE_CONFIG[item.type];

  return (
    <View style={styles.container}>
      <View style={[styles.badge, { backgroundColor: config.color }]}>
        <Text style={styles.badgeText}>{config.label}</Text>
      </View>
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  badge: {
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.s,
    marginRight: spacing.m,
    minWidth: 64,
    alignItems: "center",
  },
  badgeText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: "600",
  },
  name: {
    fontSize: 15,
    color: colors.textPrimary,
    textTransform: "capitalize",
    flex: 1,
  },
});

export default memo(PokeListItem);
