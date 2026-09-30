import React, { useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import { ThemeColors } from '../theme/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  colors: ThemeColors;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  colors,
}) => {
  const inputRef = useRef<React.ComponentRef<typeof TextInput>>(null);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => inputRef.current?.focus()}
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        {/* Search Icon */}
        <Text style={styles.searchIcon}>🔍</Text>

        {/* Input */}
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          placeholder="Tìm kiếm môn học, mã môn, giảng viên..."
          placeholderTextColor={colors.textMuted}
          style={[styles.input, { color: colors.textPrimary }]}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />

        {/* Clear Button */}
        {value.length > 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClear}
            style={[styles.clearBtn, { backgroundColor: colors.searchBg }]}
          >
            <Text style={[styles.clearBtnText, { color: colors.textSecondary }]}>
              ✕
            </Text>
          </TouchableOpacity>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 0,
  },
  clearBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  clearBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
