import { LLama } from 'llama-node';
import { LLamaCpp } from 'llama-node/dist/llm/llama-cpp.js';
import { join } from 'path';
import fs from 'fs';
import config from '../config';
import { ModelStatus } from '../types';
import intl from '../i18n';

/**
 * Сервис для работы с Llama моделью
 */
class LlamaService {
  private llama: any = null;
  private llamaCpp: any = null;
  private modelStatus: ModelStatus = { loaded: false };
  private modelPath: string;

  constructor() {
    this.modelPath = config.modelPath;
    
    // Пробуем инициализировать модель, если есть флаг обхода проверки
    const bypassModelCheck = process.env.BYPASS_MODEL_CHECK === 'true';
    
    if (!bypassModelCheck) {
      this.initialize();
    } else {
      console.log('Работа в режиме без модели (mock-режим).Для демонстрации API и разработки.');
      this.modelStatus = {
        loaded: true,
        name: 'Mock Tiny Llama Model',
        path: this.modelPath
      };
    }
  }

  /**
   * Инициализация модели
   */
  async initialize(): Promise<void> {
    try {
      // Проверяем наличие модели
      if (!fs.existsSync(this.modelPath)) {
        console.error(intl.formatMessage({ id: 'model.notFound' }));
        this.modelStatus = { 
          loaded: false,
          path: this.modelPath
        };
        return;
      }

      // Инициализация Llama
      // Используем прямой доступ к конструктору и методам
      this.llamaCpp = new LLamaCpp();
      this.llama = new LLama(LLamaCpp);
      
      // Загрузка модели через любой доступный метод
      if (typeof this.llama.load === 'function') {
        await this.llama.load({
          modelPath: this.modelPath,
          enableLogging: config.nodeEnv === 'development',
          nCtx: 2048, // Контекстное окно
          seed: 0,    // Случайное зерно
          f16Kv: true, // Использование 16-битной точности для ключей и значений
          logitsAll: false
        });
      } else if (typeof this.llama.init === 'function') {
        // Фоллбэк на старый API
        await this.llama.init(this.llamaCpp, {
          modelPath: this.modelPath,
          enableLogging: config.nodeEnv === 'development',
          nCtx: 2048,
          seed: 0,
          f16Kv: true,
          logitsAll: false
        });
      } else {
        throw new Error('Не удалось найти метод инициализации модели');
      }

      // Обновляем статус модели
      this.modelStatus = {
        loaded: true,
        name: 'Tiny Llama',
        path: this.modelPath
      };
      
      console.log(`Модель ${this.modelStatus.name} успешно загружена из ${this.modelPath}`);
    } catch (error) {
      console.error('Ошибка при инициализации модели:', error);
      this.modelStatus = { 
        loaded: false,
        path: this.modelPath
      };
    }
  }

  /**
   * Проверка статуса модели
   */
  getModelStatus(): ModelStatus {
    return this.modelStatus;
  }

  /**
   * Генерация текста на основе запроса
   * @param prompt Запрос для генерации
   * @param maxTokens Максимальное количество токенов для генерации
   * @param temperature Температура для генерации
   * @returns Сгенерированный текст и статистика
   */
  async generateText(
    prompt: string, 
    maxTokens: number = config.maxTokens, 
    temperature: number = config.temperature
  ): Promise<{ text: string; inferenceTimes: number }> {
    // Проверяем, загружена ли модель
    if (!this.modelStatus.loaded) {
      throw new Error(intl.formatMessage({ id: 'api.errors.modelNotInitialized' }));
    }
    
    // Проверяем, работаем ли мы в режиме mock
    const bypassModelCheck = process.env.BYPASS_MODEL_CHECK === 'true';
    if (bypassModelCheck || !this.llama || !this.llamaCpp) {
      // В мок-режиме просто возвращаем демонстрационный ответ
      const startTime = Date.now();
      await new Promise(resolve => setTimeout(resolve, 500)); // Имитация задержки обработки
      const endTime = Date.now();
      
      return {
        text: `[ДЕМО РЕЖИМ] Ответ на запрос: "${prompt}"\n\nЭто демонстрационный ответ API без фактической загрузки модели. В реальном режиме здесь будет ответ от модели Tiny Llama.\n\nПараметры запроса: максимум токенов=${maxTokens}, температура=${temperature.toFixed(1)}`,
        inferenceTimes: endTime - startTime
      };
    }

    const startTime = Date.now();
    console.log(intl.formatMessage({ id: 'model.inference.start' }));

    try {
      // Запуск генерации
      let resultText = '';
      
      // Создаем коллбэк для получения текста
      const callback = (token: string) => {
        resultText += token;
        return true; // продолжаем генерацию
      };
      
      // Запуск генерации через любой доступный метод
      if (typeof this.llama.createCompletion === 'function') {
        await this.llama.createCompletion({
        temperature,
        maxTokens,
        topK: 40,
        topP: 0.95,
        repeatPenalty: 1.1
        }, callback);
      } else if (typeof this.llama.getCompletion === 'function') {
        // Фоллбэк на старый API
        resultText = await this.llama.getCompletion(prompt, {
          temperature,
          maxTokens,
          topK: 40,
          topP: 0.95,
          repeatPenalty: 1.1
        });
      } else {
        throw new Error('Не удалось найти метод генерации текста');
      }

      const endTime = Date.now();
      const inferenceTimes = endTime - startTime;
      
      console.log(intl.formatMessage({ id: 'model.inference.complete' }));
      
      return {
        text: resultText.trimStart(),
        inferenceTimes
      };
    } catch (error) {
      console.error(intl.formatMessage({ id: 'model.inference.error' }), error);
      throw error;
    }
  }
}

// Singleton экземпляр сервиса
export default new LlamaService();
