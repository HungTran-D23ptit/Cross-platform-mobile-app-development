import React, { useState, useMemo } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { lightTheme, darkTheme } from './src/theme/colors';
import {
  STUDENT_PROFILE,
  STATISTICS_DATA,
  SUBJECTS_DATA,
} from './src/data/mockData';
import { Header } from './src/components/Header';
import { StatSection } from './src/components/StatSection';
import { SearchBar } from './src/components/SearchBar';
import { SubjectCard } from './src/components/SubjectCard';
import { BottomNavigation, TabId } from './src/components/BottomNavigation';

type FilterType = 'all' | 'learning' | 'completed';

function MainScreen() {
  const insets = useSafeAreaInsets();
  const systemColorScheme = useColorScheme();

  // Dark Mode state: initialized with system preference, can be toggled by user
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    systemColorScheme === 'dark'
  );

  const colors = isDarkMode ? darkTheme : lightTheme;

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [activeTab, setActiveTab] = useState<TabId>('home');

  // Filtered subjects list based on search and category tab
  const filteredSubjects = useMemo(() => {
    return SUBJECTS_DATA.filter((subject) => {
      // Search matching
      const matchesSearch =
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.instructor.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter matching
      if (!matchesSearch) return false;
      if (filterType === 'learning') return subject.progressPercent < 100;
      if (filterType === 'completed') return subject.progressPercent >= 100;
      return true;
    });
  }, [searchQuery, filterType]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleTabPress = (tab: TabId) => {
    setActiveTab(tab);
    if (tab !== 'home') {
      Alert.alert(
        'Chuyển mục',
        `Bạn đã chọn tab "${
          tab === 'subjects'
            ? 'Môn học'
            : tab === 'assignments'
            ? 'Bài tập'
            : 'Cá nhân'
        }". Giao diện đang ở chế độ xem Trang chủ.`,
        [{ text: 'OK' }]
      );
    }
  };

  // Header Component inside FlatList for smooth unified scrolling
  const renderListHeader = () => (
    <View>
      {/* 1. Header sinh viên */}
      <Header
        student={STUDENT_PROFILE}
        colors={colors}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* 2. Khu vực thống kê */}
      <StatSection
        stats={STATISTICS_DATA}
        colors={colors}
        isDarkMode={isDarkMode}
      />

      {/* 3. Ô tìm kiếm môn học */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery('')}
        colors={colors}
      />

      {/* 4. Section Title & Quick Filters */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Danh sách môn học
          </Text>
          <View style={[styles.countBadge, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.countText, { color: colors.primary }]}>
              {filteredSubjects.length} môn
            </Text>
          </View>
        </View>

        {/* Filter Chips: Tất cả / Đang học / Đã hoàn thành */}
        <View style={styles.filterChipsRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setFilterType('all')}
            style={[
              styles.filterChip,
              filterType === 'all'
                ? { backgroundColor: colors.primary }
                : [styles.filterChipInactive, { backgroundColor: colors.card, borderColor: colors.cardBorder }],
            ]}
          >
            <Text
              style={[
                styles.filterChipText,
                filterType === 'all'
                  ? styles.filterChipTextActive
                  : { color: colors.textSecondary },
              ]}
            >
              Tất cả
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setFilterType('learning')}
            style={[
              styles.filterChip,
              filterType === 'learning'
                ? { backgroundColor: colors.primary }
                : [styles.filterChipInactive, { backgroundColor: colors.card, borderColor: colors.cardBorder }],
            ]}
          >
            <Text
              style={[
                styles.filterChipText,
                filterType === 'learning'
                  ? styles.filterChipTextActive
                  : { color: colors.textSecondary },
              ]}
            >
              Đang học (4)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setFilterType('completed')}
            style={[
              styles.filterChip,
              filterType === 'completed'
                ? { backgroundColor: colors.success }
                : [styles.filterChipInactive, { backgroundColor: colors.card, borderColor: colors.cardBorder }],
            ]}
          >
            <Text
              style={[
                styles.filterChipText,
                filterType === 'completed'
                  ? styles.filterChipTextActive
                  : { color: colors.textSecondary },
              ]}
            >
              Đã xong (2)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Empty List State
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>🔍</Text>
      <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
        Không tìm thấy môn học nào
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        Thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc
      </Text>
    </View>
  );

  return (
    <View
      style={[
        styles.safeContainer,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      {/* FlatList with all requirements */}
      <FlatList
        data={filteredSubjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubjectCard
            subject={item}
            colors={colors}
          />
        )}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />

      {/* 5. Thanh điều hướng phía dưới */}
      <BottomNavigation
        activeTab={activeTab}
        onTabPress={handleTabPress}
        colors={colors}
      />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <MainScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
  },
  filterChipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipInactive: {
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyEmoji: {
    fontSize: 42,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
  },
});
