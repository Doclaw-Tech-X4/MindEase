export const colors = {
    // Primary colors
    primary: '#4B7BEC',
    primaryDark: '#3A5FCD',
    primaryLight: '#6B8FF0',

    // Secondary colors
    secondary: '#F39C12',
    secondaryDark: '#D68910',
    secondaryLight: '#F5B041',

    // Neutral colors
    white: '#FFFFFF',
    black: '#000000',
    gray: '#8E8E93',
    lightGray: '#F2F2F7',
    mediumGray: '#D1D1D6',
    darkGray: '#48484A',

    // Status colors
    success: '#34C759',
    successLight: '#A3E9C4',
    warning: '#FF9500',
    warningLight: '#FFD93D',
    error: '#FF3B30',
    errorLight: '#FF6B5B',

    // Background colors
    background: '#FFFFFF',
    backgroundSecondary: '#F2F2F7',
    cardBackground: '#FFFFFF',

    // Text colors
    text: '#000000',
    textSecondary: '#8E8E93',
    textLight: '#FFFFFF',

    // Border colors
    border: '#D1D1D6',
    borderLight: '#E5E5EA',

    // Shadow colors
    shadow: '#000000',
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 9999,
};

export const typography = {
    h1: {
        fontSize: 36,
        fontWeight: 'bold' as const,
        lineHeight: 44,
    },
    h2: {
        fontSize: 28,
        fontWeight: 'bold' as const,
        lineHeight: 34,
    },
    h3: {
        fontSize: 22,
        fontWeight: '600' as const,
        lineHeight: 28,
    },
    body1: {
        fontSize: 17,
        fontWeight: 'normal' as const,
        lineHeight: 22,
    },
    body2: {
        fontSize: 15,
        fontWeight: 'normal' as const,
        lineHeight: 20,
    },
    caption: {
        fontSize: 13,
        fontWeight: 'normal' as const,
        lineHeight: 18,
    },
};

export const shadows = {
    sm: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    md: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    lg: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
};