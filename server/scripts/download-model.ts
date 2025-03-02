import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { execSync } from 'child_process';

// Путь для сохранения модели
const MODEL_DIR = path.join(__dirname, '../models/tiny-llama-model');

// URL модели TinyLlama на Hugging Face (GGUF формат для llama.cpp)
const MODEL_URL = 'https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf';

// Функция для создания директории, если она не существует
function ensureDirectoryExists(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Создана директория: ${dir}`);
  }
}

// Функция для загрузки файла
async function downloadFile(url: string, outputPath: string): Promise<void> {
  console.log(`Начинаем загрузку модели из: ${url}`);
  console.log(`Сохраняем в: ${outputPath}`);

  try {
    // Создаем директорию, если она не существует
    ensureDirectoryExists(path.dirname(outputPath));

    // Вариант 1: Используем axios для загрузки (подходит для небольших файлов)
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(outputPath);
    
    // Вычисляем размер файла
    const totalLength = response.headers['content-length'];
    console.log(`Общий размер: ${Math.round(totalLength / 1024 / 1024)} МБ`);

    let downloadedBytes = 0;
    
    response.data.on('data', (chunk: Buffer) => {
      downloadedBytes += chunk.length;
      const progress = Math.round((downloadedBytes / totalLength) * 100);
      process.stdout.write(`\rПрогресс загрузки: ${progress}% (${Math.round(downloadedBytes / 1024 / 1024)} МБ)`);
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log('\nЗагрузка завершена!');
        resolve();
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Ошибка при загрузке модели:', error);
    console.log('\nПопробуйте вручную скачать модель по ссылке:');
    console.log(url);
    console.log(`И сохраните ее в директорию: ${path.dirname(outputPath)}`);
    throw error;
  }
}

// Главная функция
async function main(): Promise<void> {
  const modelOutputPath = path.join(MODEL_DIR, 'tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf');

  try {
    // Проверяем, существует ли уже модель
    if (fs.existsSync(modelOutputPath)) {
      console.log('Модель уже загружена.');
      console.log(`Путь к модели: ${modelOutputPath}`);
      return;
    }

    // Убедимся, что директория модели существует
    ensureDirectoryExists(MODEL_DIR);

    // Сначала установим axios, если его нет
    try {
      require.resolve('axios');
    } catch (e) {
      console.log('Устанавливаем axios...');
      execSync('npm install axios', { stdio: 'inherit' });
    }

    // Загружаем модель
    await downloadFile(MODEL_URL, modelOutputPath);

    // Обновляем .env файл
    const envPath = path.join(__dirname, '../.env');
    if (fs.existsSync(envPath)) {
      let envContent = fs.readFileSync(envPath, 'utf8');
      
      // Обновляем путь к модели и отключаем bypass режим
      envContent = envContent
        .replace(/BYPASS_MODEL_CHECK=true/g, 'BYPASS_MODEL_CHECK=false')
        .replace(/MODEL_PATH=.*/g, `MODEL_PATH=${modelOutputPath.replace(/\\/g, '/')}`);
      
      fs.writeFileSync(envPath, envContent);
      console.log('Файл .env успешно обновлен с правильным путем к модели.');
    }

    console.log('\n=================================');
    console.log('Модель успешно загружена и готова к использованию!');
    console.log(`Путь к модели: ${modelOutputPath}`);
    console.log('\nДля запуска сервера выполните:');
    console.log('npm run dev');
    console.log('=================================');
  } catch (error) {
    console.error('Произошла ошибка:', error);
    process.exit(1);
  }
}

// Запускаем основную функцию
main();
