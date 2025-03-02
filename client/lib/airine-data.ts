/**
 * AIrine Data
 * 
 * Единый файл со всей информацией о проекте AIrine, включая данные для слайдов
 * и предварительной информации для модели на русском и английском языках.
 * 
 * This is a single file containing all information about the AIrine project,
 * including data for slides and pre-trained information for the model in Russian and English.
 */

// Общие типы и интерфейсы
// Common types and interfaces

export interface Slide {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
}

export interface ProjectInfo {
  name: string;
  version: string;
  description: string;
  features: string[];
  technologies: string[];
  releaseDate: string;
  team: TeamMember[];
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface VoiceCommand {
  command: string;
  description: string;
  examples: string[];
}

export interface AIrineData {
  projectInfo: ProjectInfo;
  slides: Slide[];
  faq: FAQ[];
  voiceCommands: VoiceCommand[];
  translations: {
    projectInfo: {
      general: string;
      features: string;
      technologies: string;
      team: string;
      faq: string;
      commands: string;
      examples: string;
    };
    slides: {
      commands: {
        next: string;
        previous: string;
        new: string;
        delete: string;
        goTo: string;
        title: string;
        slideCount: string;
      };
      responses: {
        nextSlide: string;
        prevSlide: string;
        goToSlide: string;
        newSlide: string;
        deleted: string;
        cannotDelete: string;
        invalidSlide: string;
      };
    };
  };
}

// Русская версия данных
// Russian version of the data
export const airineDataRu: AIrineData = {
  projectInfo: {
    name: "AIrine",
    version: "1.0.0",
    description: "Интеллектуальный голосовой ассистент с поддержкой управления слайдами и мультиязычным интерфейсом",
    features: [
      "Голосовое управление на русском и английском языках",
      "Интерактивная презентация слайдов",
      "Мультиязычный интерфейс (русский и английский)",
      "Распознавание голосовых команд в реальном времени",
      "Возможность переключения между темами оформления",
      "Спецэффекты (режим вечеринки с конфетти)",
      "Просмотр времени и даты",
      "Адаптивный дизайн для мобильных и десктопных устройств"
    ],
    technologies: [
      "Next.js 15.1",
      "React 19",
      "TypeScript",
      "Framer Motion для анимаций",
      "WebRTC для голосового взаимодействия",
      "OpenAI API для обработки голосовых команд",
      "Tailwind CSS для стилизации",
      "next-intl для интернационализации"
    ],
    releaseDate: "Март 2025",
    team: [
      {
        name: "Ирина Александрова",
        role: "Ведущий разработчик и основатель"
      },
      {
        name: "Алексей Петров",
        role: "Дизайнер UX/UI"
      },
      {
        name: "Мария Иванова",
        role: "Специалист по ML и голосовым технологиям"
      },
      {
        name: "Дмитрий Соколов",
        role: "Разработчик фронтенда"
      }
    ]
  },
  slides: [
    {
      id: 1,
      title: "AIrine: Децентрализованная система",
      content: "AIrine — система децентрализованных локальных нод на Android для создания автономной инфраструктуры в технически ограниченных регионах, обеспечивающая доступ к AI инструментам без интернета."
    },
    {
      id: 2,
      title: "Локальные ноды на Android",
      content: "Нода запускает сервер на телефоне с открытым API, к эндпоинтам которого можно обращаться локально. Это дает доступ к AI инструментам и необходимой информации без подключения к интернету."
    },
    {
      id: 3,
      title: "Синхронизация данных",
      content: "При появлении интернет-соединения нода может загрузить, обновить и актуализировать данные от других нод сети, обеспечивая децентрализованное распространение информации."
    },
    {
      id: 4,
      title: "Клиентская часть",
      content: "Клиентская часть разработана на Next.js и обращается к API обработки голосовой трансляции через WebRTC, что значительно упрощает взаимодействие пользователя с AI агентом."
    },
    {
      id: 5,
      title: "Автономная работа",
      content: "Используя локальную ноду с запущенным сервером, мы создаем закрытую, автономную систему, работающую без доступа к интернету, решая проблему доступа к информации в технически ограниченных регионах."
    },
    {
      id: 6,
      title: "Оптимизация ресурсов",
      content: "Проект оптимизирован для работы с ограниченными ресурсами Android-устройств, с уклоном на использование nonGPU моделей, что делает систему доступной на широком спектре устройств."
    },
    {
      id: 7,
      title: "Серверная часть",
      content: "Серверная часть разработана на Express.js и обращается к локальной языковой модели, предоставляя API-эндпоинты, к которым можно подключаться с клиентской части."
    }
  ],
  faq: [
    {
      question: "Что такое AIrine?",
      answer: "AIrine — это интеллектуальный голосовой ассистент, разработанный для презентаций и управления слайдами с помощью голосовых команд. Он поддерживает русский и английский языки."
    },
    {
      question: "Какие команды поддерживает AIrine?",
      answer: "AIrine поддерживает команды для управления слайдами (следующий слайд, предыдущий слайд), смены темы оформления, запуска спецэффектов, а также информационные запросы о времени и проекте."
    },
    {
      question: "Как начать использовать AIrine?",
      answer: "Нажмите кнопку 'Начать трансляцию' и говорите команды на русском или английском языке. Для управления слайдами используйте команды 'следующий слайд', 'предыдущий слайд' и другие."
    },
    {
      question: "Требуется ли интернет для работы AIrine?",
      answer: "Да, AIrine использует облачные технологии для распознавания речи и обработки команд, поэтому требуется стабильное интернет-соединение."
    },
    {
      question: "Какие браузеры поддерживаются?",
      answer: "AIrine работает в современных версиях Chrome, Firefox, Safari и Edge, которые поддерживают WebRTC и API записи звука."
    }
  ],
  voiceCommands: [
    {
      command: "Управление слайдами",
      description: "Команды для навигации по презентации",
      examples: [
        "Следующий слайд",
        "Предыдущий слайд",
        "Перейти к слайду 3",
        "Добавить новый слайд",
        "Удалить слайд"
      ]
    },
    {
      command: "Смена темы",
      description: "Команды для изменения оформления",
      examples: [
        "Переключись на темный режим",
        "Переключись на светлый режим"
      ]
    },
    {
      command: "Спецэффекты",
      description: "Команды для активации визуальных эффектов",
      examples: [
        "Включи режим вечеринки",
        "Запусти конфетти"
      ]
    },
    {
      command: "Информация",
      description: "Команды для получения информации",
      examples: [
        "Который час?",
        "Расскажи о проекте",
        "Кто создал AIrine?",
        "Какие функции поддерживаются?",
        "Перечисли технологии проекта"
      ]
    }
  ],
  translations: {
    projectInfo: {
      general: '{name} {version} - {description}. Дата выпуска: {releaseDate}.',
      features: 'Основные функции проекта AIrine:',
      technologies: 'Технологии, используемые в проекте AIrine:',
      team: 'Команда разработчиков AIrine:',
      faq: 'Часто задаваемые вопросы о AIrine:',
      commands: 'Доступные голосовые команды в AIrine:',
      examples: 'Примеры команд'
    },
    slides: {
      commands: {
        next: 'Следующий',
        previous: 'Предыдущий',
        new: 'Новый слайд',
        delete: 'Удалить слайд',
        goTo: 'Перейти к слайду:',
        title: 'Управление карточкой',
        slideCount: 'Слайд {current} из {total}'
      },
      responses: {
        nextSlide: 'Перешел к следующему слайду',
        prevSlide: 'Перешел к предыдущему слайду',
        goToSlide: 'Перешел к слайду {number}',
        newSlide: 'Создан новый слайд',
        deleted: 'Слайд удален',
        cannotDelete: 'Невозможно удалить последний слайд',
        invalidSlide: 'Указан неверный номер слайда'
      }
    }
  }
};

// Английская версия данных
// English version of the data
export const airineDataEn: AIrineData = {
  projectInfo: {
    name: "AIrine",
    version: "1.0.0",
    description: "Intelligent voice assistant with slide management support and multilingual interface",
    features: [
      "Voice control in Russian and English",
      "Interactive slide presentation",
      "Multilingual interface (Russian and English)",
      "Real-time voice command recognition",
      "Theme switching capability",
      "Special effects (party mode with confetti)",
      "Time and date display",
      "Responsive design for mobile and desktop devices"
    ],
    technologies: [
      "Next.js 15.1",
      "React 19",
      "TypeScript",
      "Framer Motion for animations",
      "WebRTC for voice interaction",
      "OpenAI API for voice command processing",
      "Tailwind CSS for styling",
      "next-intl for internationalization"
    ],
    releaseDate: "March 2025",
    team: [
      {
        name: "Irina Alexandrova",
        role: "Lead Developer and Founder"
      },
      {
        name: "Alexey Petrov",
        role: "UX/UI Designer"
      },
      {
        name: "Maria Ivanova",
        role: "ML and Voice Technologies Specialist"
      },
      {
        name: "Dmitry Sokolov",
        role: "Frontend Developer"
      }
    ]
  },
  slides: [
    {
      id: 1,
      title: "Voice Commands",
      content: "Use voice commands to control the application. Just press the 'Start Broadcast' button and start speaking."
    },
    {
      id: 2,
      title: "Theme Switching",
      content: "Say 'Switch to dark mode' or 'Switch to light mode' to change the application theme."
    },
    {
      id: 3,
      title: "Getting Time",
      content: "Ask 'What time is it?' to get the current time."
    },
    {
      id: 4,
      title: "Party Mode",
      content: "Say 'Turn on party mode' to start the confetti animation."
    },
    {
      id: 5,
      title: "Project Information",
      content: "Say 'Tell me about the project' to learn more about AIrine and its features."
    }
  ],
  faq: [
    {
      question: "What is AIrine?",
      answer: "AIrine is an intelligent voice assistant designed for presentations and slide management using voice commands. It supports both Russian and English languages."
    },
    {
      question: "What commands does AIrine support?",
      answer: "AIrine supports commands for slide navigation (next slide, previous slide), theme switching, special effects activation, as well as information requests about time and the project."
    },
    {
      question: "How do I start using AIrine?",
      answer: "Press the 'Start Broadcasting' button and speak commands in Russian or English. To control slides, use commands like 'next slide', 'previous slide', and others."
    },
    {
      question: "Is internet required for AIrine to work?",
      answer: "Yes, AIrine uses cloud technologies for speech recognition and command processing, so a stable internet connection is required."
    },
    {
      question: "Which browsers are supported?",
      answer: "AIrine works in modern versions of Chrome, Firefox, Safari, and Edge that support WebRTC and the Audio Recording API."
    }
  ],
  voiceCommands: [
    {
      command: "Slide Control",
      description: "Commands for presentation navigation",
      examples: [
        "Next slide",
        "Previous slide",
        "Go to slide 3",
        "Add new slide",
        "Delete slide"
      ]
    },
    {
      command: "Theme Switching",
      description: "Commands for changing appearance",
      examples: [
        "Switch to dark mode",
        "Switch to light mode"
      ]
    },
    {
      command: "Special Effects",
      description: "Commands for activating visual effects",
      examples: [
        "Turn on party mode",
        "Launch confetti"
      ]
    },
    {
      command: "Information",
      description: "Commands for getting information",
      examples: [
        "What time is it?",
        "Tell me about the project",
        "Who created AIrine?",
        "What features are supported?",
        "List project technologies"
      ]
    }
  ],
  translations: {
    projectInfo: {
      general: '{name} {version} - {description}. Release date: {releaseDate}.',
      features: 'Main features of the AIrine project:',
      technologies: 'Technologies used in the AIrine project:',
      team: 'AIrine development team:',
      faq: 'Frequently asked questions about AIrine:',
      commands: 'Available voice commands in AIrine:',
      examples: 'Command examples'
    },
    slides: {
      commands: {
        next: 'Next',
        previous: 'Previous',
        new: 'New Slide',
        delete: 'Delete Slide',
        goTo: 'Go to slide:',
        title: 'Card Controls',
        slideCount: 'Slide {current} of {total}'
      },
      responses: {
        nextSlide: 'Moved to the next slide',
        prevSlide: 'Moved to the previous slide',
        goToSlide: 'Moved to slide {number}',
        newSlide: 'Created a new slide',
        deleted: 'Slide deleted',
        cannotDelete: 'Cannot delete the last slide',
        invalidSlide: 'Invalid slide number'
      }
    }
  }
};

// Функция для получения данных по языку
// Function to get data by language
export const getAIrineData = (locale: string): AIrineData => {
  return locale === 'ru' ? airineDataRu : airineDataEn;
};

// Функция для получения слайдов по языку
// Function to get slides by language
export const getSlides = (locale: string): Slide[] => {
  return getAIrineData(locale).slides;
};

// Функция для получения общей информации о проекте
// Function to get general project information
export const getProjectInfo = (locale: string): ProjectInfo => {
  return getAIrineData(locale).projectInfo;
};

// Функция для получения списка функций проекта
// Function to get project features
export const getProjectFeatures = (locale: string): string[] => {
  return getAIrineData(locale).projectInfo.features;
};

// Функция для получения списка технологий
// Function to get technologies list
export const getProjectTechnologies = (locale: string): string[] => {
  return getAIrineData(locale).projectInfo.technologies;
};

// Функция для получения информации о команде
// Function to get team information
export const getTeamInfo = (locale: string): TeamMember[] => {
  return getAIrineData(locale).projectInfo.team;
};

// Функция для получения часто задаваемых вопросов
// Function to get frequently asked questions
export const getFAQ = (locale: string): FAQ[] => {
  return getAIrineData(locale).faq;
};

// Функция для получения голосовых команд
// Function to get voice commands
export const getVoiceCommands = (locale: string): VoiceCommand[] => {
  return getAIrineData(locale).voiceCommands;
};

// Функция для форматирования строки с переменными
// Function to format a string with variables
export const formatString = (str: string, variables: Record<string, string | number>): string => {
  return str.replace(/{(\w+)}/g, (match, key) => {
    return variables[key] !== undefined ? String(variables[key]) : match;
  });
};

// Экспорт всех функций и данных
const airineDataExports = {
  airineDataRu,
  airineDataEn,
  getAIrineData,
  getSlides,
  getProjectInfo,
  getProjectFeatures,
  getProjectTechnologies,
  getTeamInfo,
  getFAQ,
  getVoiceCommands,
  formatString
};

export default airineDataExports;
