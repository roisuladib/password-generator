import { toBoolean } from './utils';

export const STRENGTH_COLORS = ['danger', 'warning', 'primary', 'success'] as const;
export const STRENGTH_VALUES = [25, 50, 75, 100] as const;

type ToggleKey = 'lowercase' | 'uppercase' | 'numbers' | 'symbols';
interface ToggleOption {
   key: ToggleKey;
   label: string;
   parse?: (value: any) => boolean;
 }

export const TOGGLES: ToggleOption[] = [
  { key: 'uppercase', label: 'Include Uppercase (A–Z)' },
  { key: 'lowercase', label: 'Include Lowercase (a–z)' },
  { key: 'numbers', label: 'Include Numbers (0–9)' },
  { key: 'symbols', label: 'Include Symbols (!@#$...)', parse: toBoolean },
];
