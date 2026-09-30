import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StatisticItem } from '../data/mockData';
import { ThemeColors } from '../theme/colors';

interface StatSectionProps {
  stats: StatisticItem[];
  colors: ThemeColors;
  isDarkMode: boolean;
}

export const StatSection: React.FC<StatSectionProps> = ({
  stats,
  colors,
  isDarkMode,
}) => {
  const handleStatPress = (item: StatisticItem) => {
    Alert.alert(
      item.title,
      `Chi tiết: ${item.value} (${item.subtitle})`,
      [{ text: 'Đóng' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Tổng quan học tập
        </Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
          Kỳ 1 • 2026-2027
        </Text>
      </View>

      <View style={styles.cardsRow}>
        {stats.map((item) => {
          const bgThemeColor = isDarkMode ? item.darkBgColor : item.lightBgColor;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => handleStatPress(item)}
              style={[
                styles.statCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                },
              ]}
            >
              {/* Icon Container with subtle tinted background */}
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: bgThemeColor },
                ]}
              >
                <Text style={styles.iconEmoji}>{item.icon}</Text>
              </View>

              {/* Number Value */}
              <Text
                style={[
                  styles.statValue,
                  { color: item.accentColor },
                ]}
              >
                {item.value}
              </Text>

              {/* Title */}
              <Text
                style={[styles.statTitle, { color: colors.textPrimary }]}
                numberOfLines={1}
              >
                {item.title}
              </Text>

              {/* Subtitle */}
              <Text
                style={[styles.statSubtitleText, { color: colors.textMuted }]}
                numberOfLines={1}
              >
                {item.subtitle}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconEmoji: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  statSubtitleText: {
    fontSize: 10,
    textAlign: 'center',
  },
});
