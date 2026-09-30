import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SubjectItem } from '../data/mockData';
import { ThemeColors } from '../theme/colors';

interface SubjectCardProps {
  subject: SubjectItem;
  colors: ThemeColors;
  onPress?: () => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  colors,
  onPress,
}) => {
  const isCompleted = subject.progressPercent >= 100;

  const handleCardPress = () => {
    if (onPress) {
      onPress();
      return;
    }
    Alert.alert(
      subject.name,
      `Mã môn: ${subject.code}\nGiảng viên: ${subject.instructor}\nSố tín chỉ: ${subject.credits}\nTiến độ: ${subject.lessonsCount}/${subject.totalLessons} bài học (${subject.progressPercent}%)\nTrạng thái: ${isCompleted ? '✅ Đã hoàn thành' : '⏳ Đang học'}`,
      [{ text: 'Đóng' }]
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleCardPress}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: isCompleted ? colors.success : colors.cardBorder,
        },
      ]}
    >
      {/* Top Row: Icon + Subject Info + Status Badge */}
      <View style={styles.topRow}>
        {/* Subject Icon Box */}
        <View
          style={[
            styles.iconWrapper,
            {
              backgroundColor: colors.primaryLight,
              borderColor: subject.accentColor,
            },
          ]}
        >
          <Text style={styles.subjectIconEmoji}>{subject.iconEmoji}</Text>
        </View>

        {/* Name and Meta */}
        <View style={styles.infoWrapper}>
          <View style={styles.categoryRow}>
            <Text style={[styles.codeTag, { color: colors.primary, backgroundColor: colors.primaryLight }]}>
              {subject.code}
            </Text>
            <Text style={[styles.categoryText, { color: colors.textSecondary }]}>
              {subject.category} • {subject.credits} TC
            </Text>
          </View>

          <Text
            style={[styles.subjectName, { color: colors.textPrimary }]}
            numberOfLines={1}
          >
            {subject.name}
          </Text>

          <Text
            style={[styles.instructorText, { color: colors.textSecondary }]}
            numberOfLines={1}
          >
            GV: {subject.instructor}
          </Text>
        </View>

        {/* Status Badge: Đã hoàn thành (100%) or Đang học */}
        {isCompleted ? (
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: colors.successLight },
            ]}
          >
            <Text style={[styles.statusText, { color: colors.success }]}>
              ✓ Đã xong
            </Text>
          </View>
        ) : (
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: colors.searchBg },
            ]}
          >
            <Text style={[styles.statusText, { color: colors.textMuted }]}>
              Đang học
            </Text>
          </View>
        )}
      </View>

      {/* Lesson details & Percentage */}
      <View style={styles.progressHeaderRow}>
        <Text style={[styles.lessonCountText, { color: colors.textSecondary }]}>
          📖 {subject.lessonsCount}/{subject.totalLessons} bài học
        </Text>
        <Text
          style={[
            styles.percentText,
            {
              color: isCompleted ? colors.success : colors.primary,
            },
          ]}
        >
          {subject.progressPercent}%
        </Text>
      </View>

      {/* Progress Bar */}
      <View
        style={[
          styles.progressTrack,
          { backgroundColor: colors.progressTrack },
        ]}
      >
        <View
          style={[
            styles.progressBar,
            {
              width: `${Math.min(subject.progressPercent, 100)}%`,
              backgroundColor: isCompleted ? colors.success : colors.primary,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1.5,
  },
  subjectIconEmoji: {
    fontSize: 22,
  },
  infoWrapper: {
    flex: 1,
    marginRight: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  codeTag: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '500',
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: 0.1,
  },
  instructorText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  lessonCountText: {
    fontSize: 12,
    fontWeight: '500',
  },
  percentText: {
    fontSize: 12,
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});
