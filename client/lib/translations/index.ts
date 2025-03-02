// Импорт переводов для всех поддерживаемых языков
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { zh } from './zh';
import { ru } from './ru';
import { uk } from './uk';

// Экспорт всех переводов
export const translations = {
  en,
  es,
  fr,
  zh,
  ru,
  uk
};

// Список доступных языков для выбора
export const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'zh', name: '中文' },
  { code: 'ru', name: 'Русский' },
  { code: 'uk', name: 'Українська' }
];

// Функция получения переводов по коду языка
export const getTranslation = (locale: string) => {
  return translations[locale as keyof typeof translations] || en;
};

// Тип для переводов
export type Translation = typeof en;
