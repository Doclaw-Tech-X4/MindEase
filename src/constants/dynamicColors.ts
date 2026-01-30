import { useTheme } from '../context/ThemeContext';

export const useDynamicColors = () => {
  const { isDarkMode } = useTheme();

  const colors = {
    // Primary colors
    primary: '#4F46E5',
    primaryLight: isDarkMode ? '#6366F1' : '#E0E7FF',
    primaryDark: '#4338CA',
    
    // Background colors
    background: isDarkMode ? '#111827' : '#FFFFFF',
    backgroundSecondary: isDarkMode ? '#1F2937' : '#F9FAFB',
    backgroundTertiary: isDarkMode ? '#374151' : '#F3F4F6',
    
    // Text colors
    text: isDarkMode ? '#F9FAFB' : '#111827',
    textSecondary: isDarkMode ? '#D1D5DB' : '#6B7280',
    textTertiary: isDarkMode ? '#9CA3AF' : '#9CA3AF',
    
    // Border colors
    border: isDarkMode ? '#374151' : '#E5E7EB',
    borderLight: isDarkMode ? '#4B5563' : '#F3F4F6',
    
    // Status colors
    success: '#10B981',
    successLight: isDarkMode ? '#34D399' : '#D1FAE5',
    warning: '#F59E0B',
    warningLight: isDarkMode ? '#FCD34D' : '#FEF3C7',
    error: '#EF4444',
    errorLight: isDarkMode ? '#F87171' : '#FEE2E2',
    
    // Neutral colors
    gray: isDarkMode ? '#6B7280' : '#6B7280',
    grayLight: isDarkMode ? '#9CA3AF' : '#D1D5DB',
    
    // White and black
    white: '#FFFFFF',
    black: '#000000',
  };

  return colors;
};
