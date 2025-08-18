import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Classes CSS personnalisées pour Tailwind v4 avec support du mode sombre
export const customClasses = {
  // Couleurs de fond
  bgPrimary: 'bg-red-800 dark:bg-red-600',
  bgPrimaryLight: 'bg-red-700 dark:bg-red-500',
  bgPrimaryDark: 'bg-red-900 dark:bg-red-700',
  bgDark: 'bg-gray-900 dark:bg-gray-800',
  bgDarkLight: 'bg-gray-800 dark:bg-gray-700',
  bgDarkLighter: 'bg-gray-700 dark:bg-gray-600',
  bgLight: 'bg-white dark:bg-gray-900',
  bgLightGray: 'bg-gray-100 dark:bg-gray-800',
  bgLightSecondary: 'bg-gray-200 dark:bg-gray-700',
  bgBackgroundPrimary: 'bg-white dark:bg-gray-900',
  bgBackgroundSecondary: 'bg-gray-50 dark:bg-gray-800',
  bgBackgroundDark: 'bg-gray-900 dark:bg-gray-950',

  // Couleurs de texte
  textPrimary: 'text-red-800 dark:text-red-400',
  textPrimaryLight: 'text-red-700 dark:text-red-300',
  textPrimaryDark: 'text-red-900 dark:text-red-500',
  textDark: 'text-gray-900 dark:text-white',
  textDarkLight: 'text-gray-800 dark:text-gray-200',
  textDarkLighter: 'text-gray-700 dark:text-gray-300',
  textLight: 'text-white dark:text-gray-900',
  textLightGray: 'text-gray-500 dark:text-gray-400',
  textLightSecondary: 'text-gray-600 dark:text-gray-300',
  textTextPrimary: 'text-gray-900 dark:text-white',
  textTextSecondary: 'text-gray-600 dark:text-gray-300',
  textTextLight: 'text-white dark:text-gray-900',

  // Bordures
  borderPrimary: 'border-red-800 dark:border-red-600',
  borderPrimaryLight: 'border-red-700 dark:border-red-500',
  borderPrimaryDark: 'border-red-900 dark:border-red-700',
  borderDark: 'border-gray-900 dark:border-gray-800',
  borderDarkLight: 'border-gray-800 dark:border-gray-700',
  borderDarkLighter: 'border-gray-700 dark:border-gray-600',
  borderLight: 'border-white dark:border-gray-900',
  borderLightGray: 'border-gray-100 dark:border-gray-800',
  borderLightSecondary: 'border-gray-200 dark:border-gray-700',
  borderTextPrimary: 'border-gray-900 dark:border-white',
  borderTextSecondary: 'border-gray-600 dark:border-gray-300',
  borderTextLight: 'border-white dark:border-gray-900',

  // Focus rings
  focusRingPrimary: 'focus:ring-red-800 dark:focus:ring-red-600',
  focusRingPrimaryLight: 'focus:ring-red-700 dark:focus:ring-red-500',
  focusRingPrimaryDark: 'focus:ring-red-900 dark:focus:ring-red-700',

  // Hover states
  hoverBgPrimary: 'hover:bg-red-800 dark:hover:bg-red-600',
  hoverBgPrimaryLight: 'hover:bg-red-700 dark:hover:bg-red-500',
  hoverBgPrimaryDark: 'hover:bg-red-900 dark:hover:bg-red-700',
  hoverTextLight: 'hover:text-white dark:hover:text-gray-900',
  hoverTextPrimary: 'hover:text-red-800 dark:hover:text-red-400',

  // Opacité
  bgPrimaryOpacity20: 'bg-red-800/20 dark:bg-red-600/20',
  bgPrimaryOpacity10: 'bg-red-800/10 dark:bg-red-600/10',
  bgPrimaryOpacity5: 'bg-red-800/5 dark:bg-red-600/5',

  // Police
  fontPoppins: 'font-sans',
  fontRegular: 'font-normal',
  fontMedium: 'font-medium',
  fontSemibold: 'font-semibold',
  fontBold: 'font-bold',
}
