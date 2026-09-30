import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeColors } from '../theme/colors';

export type TabId = 'home' | 'subjects' | 'assignments' | 'profile';

interface TabItem {
  id: TabId;
  label: string;
  icon: string;
  badge?: number;
}

interface BottomNavigationProps {
  activeTab: TabId;
  onTabPress: (tab: TabId) => void;
  colors: ThemeColors;
}

const TABS: TabItem[] = [
  { id: 'home', label: 'Trang chủ', icon: '🏠' },
  { id: 'subjects', label: 'Môn học', icon: '📚' },
  { id: 'assignments', label: 'Bài tập', icon: '📝', badge: 3 },
  { id: 'profile', label: 'Cá nhân', icon: '👤' },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
  colors,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.tabBarBg,
          borderTopColor: colors.tabBarBorder,
        },
      ]}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.7}
            onPress={() => onTabPress(tab.id)}
            style={styles.tabButton}
          >
            {/* Active Pill Indicator for icon */}
            <View
              style={[
                styles.iconContainer,
                isActive && {
                  backgroundColor: colors.primaryLight,
                },
              ]}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              {tab.badge && tab.badge > 0 && !isActive && (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>{tab.badge}</Text>
                </View>
              )}
            </View>

            {/* Label */}
            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.tabLabelActive : styles.tabLabelInactive,
                { color: isActive ? colors.primary : colors.textSecondary },
              ]}
            >
              {tab.label}
            </Text>

            {/* Active indicator dot */}
            {isActive && (
              <View
                style={[styles.activeDot, { backgroundColor: colors.primary }]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingBottom: 16,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 8,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 2,
  },
  iconContainer: {
    width: 44,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 3,
  },
  tabIcon: {
    fontSize: 18,
  },
  tabLabel: {
    fontSize: 11,
    letterSpacing: 0.1,
  },
  tabLabelActive: {
    fontWeight: '700',
  },
  tabLabelInactive: {
    fontWeight: '500',
  },
  tabBadge: {
    position: 'absolute',
    top: -2,
    right: 4,
    backgroundColor: '#EF4444',
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  tabBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 3,
  },
});
