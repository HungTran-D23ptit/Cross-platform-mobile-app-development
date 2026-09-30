import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { ThemeColors } from '../theme/colors';
import { StudentInfo } from '../data/mockData';

interface HeaderProps {
  student: StudentInfo;
  colors: ThemeColors;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const DEFAULT_AVATAR_URI =
  'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

export const Header: React.FC<HeaderProps> = ({
  student,
  colors,
  isDarkMode,
  onToggleTheme,
}) => {
  const [imageError, setImageError] = React.useState(false);

  const handleNotificationPress = () => {
    Alert.alert(
      'Thông báo học tập',
      `Bạn có ${student.unreadNotifications} thông báo mới:\n- Lịch thi giữa kỳ môn Lập trình di động đã có.\n- Hạn nộp bài tập lớn CSDL vào chủ nhật này.\n- Thông báo khảo sát chất lượng giảng dạy.`,
      [{ text: 'Đã hiểu' }]
    );
  };

  const handleAvatarPress = () => {
    Alert.alert(
      'Thông tin cá nhân',
      `Họ tên: ${student.name}\nMSSV: ${student.studentId}\n${student.department}`,
      [{ text: 'Đóng' }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      {/* Left: Avatar with Status indicator */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleAvatarPress}
        style={styles.avatarWrapper}
      >
        {imageError ? (
          <View
            style={[
              styles.avatar,
              styles.fallbackAvatar,
              { backgroundColor: colors.primaryLight, borderColor: colors.primary },
            ]}
          >
            <Text style={styles.fallbackAvatarText}>👤</Text>
          </View>
        ) : (
          <Image
            source={{
              uri: student.avatarUrl || DEFAULT_AVATAR_URI,
            }}
            style={styles.avatar}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        )}
        <View style={styles.onlineDot} />
      </TouchableOpacity>

      {/* Center: Greeting & Student Info */}
      <View style={styles.textContainer}>
        <View style={styles.greetingRow}>
          <Text style={[styles.greetingText, { color: colors.textSecondary }]}>
            {student.greeting}
          </Text>
        </View>
        <Text style={[styles.nameText, { color: colors.textPrimary }]} numberOfLines={1}>
          {student.name}
        </Text>
        <View style={styles.idBadge}>
          <Text style={styles.idText}>MSSV: {student.studentId}</Text>
        </View>
      </View>

      {/* Right: Actions (Theme Toggle + Notification Bell) */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onToggleTheme}
          style={[styles.iconButton, { backgroundColor: colors.searchBg }]}
        >
          <Text style={styles.iconEmoji}>{isDarkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleNotificationPress}
          style={[styles.iconButton, { backgroundColor: colors.searchBg }]}
        >
          <Text style={styles.iconEmoji}>🔔</Text>
          {student.unreadNotifications > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>
                {student.unreadNotifications}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 14,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  fallbackAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackAvatarText: {
    fontSize: 26,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  idBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 3,
  },
  idText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4F46E5',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconEmoji: {
    fontSize: 18,
  },
  badgeContainer: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
