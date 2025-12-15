import type { MaterialIcons } from '@expo/vector-icons';

export type IconSets = 'MaterialIcons';

export type TimeSinceEventGlyph = keyof typeof MaterialIcons.glyphMap;

export const DEFAULT_EVENT_GLYPH = 'bookmark-outline';
