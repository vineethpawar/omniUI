/**
 * Spacing scale. Mirrors Tailwind's pattern: integers map to multiples of 4px.
 * Used by Box, Stack, layouts.
 */
export const spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const;

export type SpacingKey = keyof typeof spacing;

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 9999,
} as const;

export type RadiusKey = keyof typeof radius;
