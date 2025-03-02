import dotenv from 'dotenv';
import { ServerConfig } from '../types';

// Загрузка переменных окружения из .env файла
dotenv.config();

/**
 * Конфигурация сервера на основе переменных окружения
 */
const config: ServerConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  modelPath: process.env.MODEL_PATH || './models/tiny-llama-model',
  maxTokens: parseInt(process.env.MAX_TOKENS || '512', 10),
  temperature: parseFloat(process.env.TEMPERATURE || '0.7'),
};

/**
 * Проверка конфигурации на валидность
 */
export const validateConfig = (): boolean => {
  const requiredEnvVars = ['PORT', 'MODEL_PATH'];
  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missingEnvVars.length > 0) {
    console.error(`Отсутствуют обязательные переменные окружения: ${missingEnvVars.join(', ')}`);
    return false;
  }
  
  return true;
};

export default config;
