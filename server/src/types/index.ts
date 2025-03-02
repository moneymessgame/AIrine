// Типы для запросов и ответов API

/**
 * Параметры для запроса на генерацию текста
 */
export interface GenerateRequestParams {
  /** Текст запроса к модели */
  prompt: string;
  /** Максимальное количество токенов для генерации (по умолчанию: значение из конфигурации) */
  maxTokens?: number;
  /** Температура для генерации (влияет на случайность, по умолчанию: значение из конфигурации) */
  temperature?: number;
  /** Запрашиваемая локаль для ответа (ru или en) */
  locale?: 'ru' | 'en';
}

/**
 * Ответ API на запрос генерации текста
 */
export interface GenerateResponse {
  /** Сгенерированный текст */
  generated_text: string;
  /** Статистика выполнения */
  stats: {
    /** Время выполнения в миллисекундах */
    inference_time_ms: number;
    /** Количество сгенерированных токенов */
    tokens_generated: number;
  };
}

/**
 * Ответ API с ошибкой
 */
export interface ErrorResponse {
  /** Код ошибки */
  error: string;
  /** Сообщение об ошибке */
  message: string;
}

/**
 * Статус модели
 */
export interface ModelStatus {
  /** Загружена ли модель */
  loaded: boolean;
  /** Название модели */
  name?: string;
  /** Путь к модели */
  path?: string;
}

/**
 * Конфигурация сервера
 */
export interface ServerConfig {
  /** Порт для запуска сервера */
  port: number;
  /** Режим работы (development/production) */
  nodeEnv: string;
  /** Путь к модели */
  modelPath: string;
  /** Максимальное количество токенов для генерации */
  maxTokens: number;
  /** Температура для генерации */
  temperature: number;
}
