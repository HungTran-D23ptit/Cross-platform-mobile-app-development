export interface StudentInfo {
  name: string;
  studentId: string;
  greeting: string;
  department: string;
  avatarUrl: string;
  unreadNotifications: number;
}

export interface StatisticItem {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  accentColor: string;
  lightBgColor: string;
  darkBgColor: string;
}

export interface SubjectItem {
  id: string;
  code: string;
  name: string;
  instructor: string;
  lessonsCount: number;
  totalLessons: number;
  credits: number;
  progressPercent: number; // 0 - 100
  iconEmoji: string;
  accentColor: string;
  category: string;
}

export const STUDENT_PROFILE: StudentInfo = {
  name: 'Trần Duy Hưng',
  studentId: 'B23DCCC083',
  greeting: 'Xin chào sinh viên 👋',
  department: 'Khoa Công Nghệ Thông Tin 1',
  avatarUrl: '', // Để trống để dùng avatar mặc định
  unreadNotifications: 3,
};

export const STATISTICS_DATA: StatisticItem[] = [
  {
    id: 'stat-1',
    title: 'Tổng số môn học',
    value: '06',
    subtitle: 'Học kỳ 1 - 2026',
    icon: '📚',
    accentColor: '#4F46E5',
    lightBgColor: '#EEF2FF',
    darkBgColor: '#1E1B4B',
  },
  {
    id: 'stat-2',
    title: 'Số bài tập',
    value: '18',
    subtitle: '3 bài sắp đến hạn',
    icon: '📝',
    accentColor: '#F59E0B',
    lightBgColor: '#FEF3C7',
    darkBgColor: '#78350F',
  },
  {
    id: 'stat-3',
    title: 'Môn đã hoàn thành',
    value: '02',
    subtitle: 'Đạt chuẩn đầu ra',
    icon: '🏆',
    accentColor: '#10B981',
    lightBgColor: '#D1FAE5',
    darkBgColor: '#064E3B',
  },
];

export const SUBJECTS_DATA: SubjectItem[] = [
  {
    id: 'sub-1',
    code: 'INT1314',
    name: 'Lập trình thiết bị di động',
    instructor: 'TS. Lê Anh Tuấn',
    lessonsCount: 16,
    totalLessons: 16,
    credits: 3,
    progressPercent: 100,
    iconEmoji: '📱',
    accentColor: '#10B981',
    category: 'Chuyên ngành',
  },
  {
    id: 'sub-2',
    code: 'INT1340',
    name: 'Cấu trúc dữ liệu & Giải thuật',
    instructor: 'PGS.TS. Trần Văn Hải',
    lessonsCount: 12,
    totalLessons: 15,
    credits: 4,
    progressPercent: 80,
    iconEmoji: '⚡',
    accentColor: '#4F46E5',
    category: 'Cơ sở ngành',
  },
  {
    id: 'sub-3',
    code: 'INT1306',
    name: 'Công nghệ phần mềm',
    instructor: 'ThS. Nguyễn Quỳnh Chi',
    lessonsCount: 7,
    totalLessons: 14,
    credits: 3,
    progressPercent: 50,
    iconEmoji: '💻',
    accentColor: '#0EA5E9',
    category: 'Chuyên ngành',
  },
  {
    id: 'sub-4',
    code: 'INT1332',
    name: 'Hệ quản trị cơ sở dữ liệu',
    instructor: 'ThS. Phạm Đăng Khoa',
    lessonsCount: 4,
    totalLessons: 12,
    credits: 3,
    progressPercent: 33,
    iconEmoji: '🗄️',
    accentColor: '#8B5CF6',
    category: 'Cơ sở ngành',
  },
  {
    id: 'sub-5',
    code: 'INT1310',
    name: 'Mạng máy tính & Truyền thông',
    instructor: 'TS. Vũ Minh Đức',
    lessonsCount: 14,
    totalLessons: 14,
    credits: 3,
    progressPercent: 100,
    iconEmoji: '🌐',
    accentColor: '#10B981',
    category: 'Cơ sở ngành',
  },
  {
    id: 'sub-6',
    code: 'INT1434',
    name: 'Trí tuệ nhân tạo (AI)',
    instructor: 'PGS.TS. Đỗ Hồng Quân',
    lessonsCount: 3,
    totalLessons: 15,
    credits: 3,
    progressPercent: 20,
    iconEmoji: '🤖',
    accentColor: '#EC4899',
    category: 'Tự chọn',
  },
];
