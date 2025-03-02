// Реализация простого интерфейса i18n без зависимости от createIntl

// Типы для переводов
export interface Translations {
  common: {
    welcome: string;
    error: string;
    success: string;
  };
  model: {
    notFound: string;
    inference: {
      start: string;
      complete: string;
      error: string;
    };
  };
  api: {
    validation: {
      missingPrompt: string;
      invalidParams: string;
    };
    errors: {
      serverError: string;
      modelNotInitialized: string;
    };
  };
}

// Переводы на русском (основной язык)
export const ru: Translations = {
  common: {
    welcome: 'Добро пожаловать в API для Tiny Llama',
    error: 'Ошибка',
    success: 'Успех',
  },
  model: {
    notFound: 'Модель не найдена по указанному пути',
    inference: {
      start: 'Начало генерации текста',
      complete: 'Генерация текста завершена',
      error: 'Ошибка при генерации текста',
    },
  },
  api: {
    validation: {
      missingPrompt: 'Отсутствует обязательный параметр "prompt"',
      invalidParams: 'Неверные параметры запроса',
    },
    errors: {
      serverError: 'Внутренняя ошибка сервера',
      modelNotInitialized: 'Модель не инициализирована',
    },
  },
};

// Переводы на английском
export const en: Translations = {
  common: {
    welcome: 'Welcome to Tiny Llama API',
    error: 'Error',
    success: 'Success',
  },
  model: {
    notFound: 'Model not found at the specified path',
    inference: {
      start: 'Text generation started',
      complete: 'Text generation completed',
      error: 'Error during text generation',
    },
  },
  api: {
    validation: {
      missingPrompt: 'Missing required parameter "prompt"',
      invalidParams: 'Invalid request parameters',
    },
    errors: {
      serverError: 'Internal server error',
      modelNotInitialized: 'Model not initialized',
    },
  },
};

// Класс для интернационализации
class IntlService {
  private locale: 'ru' | 'en';
  private messages: Translations;

  constructor(locale: 'ru' | 'en') {
    this.locale = locale;
    this.messages = locale === 'ru' ? ru : en;
  }

  // Форматирование сообщения по ключу
  formatMessage({ id, locale }: { id: string; locale?: 'ru' | 'en' }) {
    const actualLocale = locale || this.locale;
    const messages = actualLocale === 'ru' ? ru : en;
    
    // Разбираем id вида 'category.subcategory.message'
    const keys = id.split('.');
    let result: any = messages;
    
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        return id; // Возвращаем ключ, если сообщение не найдено
      }
    }
    
    return result as string;
  }
}

// Функция для создания интернационализации
export const getIntl = (locale: 'ru' | 'en') => {
  return new IntlService(locale);
};

// Экспорт по умолчанию русской локализации
export default getIntl('ru');
