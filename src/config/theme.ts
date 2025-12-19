/**
 * Theme configuration for the Academy of Pedagogical Education
 * Contains brand colors and design tokens
 */

export const theme = {
  colors: {
    primary: {
      DEFAULT: '#1e3a8a',
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1e3a8a',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    accent: {
      DEFAULT: '#fbbf24',
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
  },
  // Add additional design tokens as needed
  spacing: {
    container: '1280px',
  },
} as const;

export type Theme = typeof theme;
