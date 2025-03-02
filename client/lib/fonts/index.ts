import { PT_Sans_Narrow } from 'next/font/google';

// Подключение шрифта PT Sans Narrow с поддержкой кириллицы
export const ptSansNarrow = PT_Sans_Narrow({
  weight: ['400', '700'],
  subsets: ['cyrillic', 'latin'],
  variable: '--font-pt-sans-narrow',
  display: 'swap',
});
