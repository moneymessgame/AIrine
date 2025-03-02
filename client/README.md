# AIrine

## About the Project

**AIrine** is a groundbreaking decentralized system designed to bridge the digital divide in regions with limited technical infrastructure. By deploying local nodes on Android devices, AIrine creates an autonomous network that provides critical access to AI tools and information without requiring internet connectivity.

Each AIrine node functions as a complete, self-contained unit that:

- **Operates a Local Server**: Runs a lightweight Express.js server directly on Android devices, exposing API endpoints that can be accessed locally from the same device
- **Functions Completely Offline**: Delivers full AI capabilities and information access in environments with limited or no internet connectivity
- **Optimizes for Resource Constraints**: Utilizes specialized nonGPU language models specifically designed for hardware-limited Android devices
- **Synchronizes When Possible**: Automatically updates and shares data with other nodes when internet connectivity becomes available

The client interface, built with Next.js, leverages WebRTC technology to enable intuitive voice interaction with AI agents. This dramatically simplifies the user experience by eliminating complex text inputs, making powerful AI tools accessible to users with varying levels of technical literacy.

### Technical Architecture

**Server Component:**
- Express.js backend deployed on Android devices
- Local language model integration optimized for mobile hardware
- RESTful API endpoints providing structured access to AI functionality
- Robust data synchronization mechanisms supporting mesh networking

**Client Component:**
- Responsive Next.js frontend application
- WebRTC integration enabling real-time voice transcription and processing
- Voice-driven interface that significantly reduces interaction barriers
- Multi-language support with adaptive design principles

By creating a "boxed solution" that works without external dependencies, AIrine effectively addresses the challenge of information access in technically constrained environments, providing an autonomous, secure, and resilient AI infrastructure where traditional solutions fail.

## Основные возможности

- **Голосовое управление**: Управление презентацией с помощью голосовых команд на русском и английском языках
- **Навигация по слайдам**: Переход к конкретному слайду по номеру или названию
- **Информация о времени**: Получение текущего времени по голосовой команде
- **Мультиязычность**: Полная поддержка русского и английского языков для интерфейса и голосовых команд
- **Информация о проекте**: Доступ к подробной информации о проекте через голосовые команды

## Технологии

- **TypeScript**: Обеспечение типобезопасности и улучшенный опыт разработки
- **Next.js 15**: Фреймворк для серверного рендеринга и API маршрутов
- **OpenAI Realtime API**: Обработка и распознавание голосовых команд в реальном времени
- **WebRTC**: Технология для передачи аудио потока
- **Tailwind CSS**: Стилизация компонентов
- **Framer Motion**: Создание плавных анимаций
- **shadcn/ui**: Библиотека компонентов пользовательского интерфейса
- **next-intl**: Локализация и интернационализация приложения

## Требования

- **Node.js** (версия 18 или выше)
- Ключ OpenAI API с доступом к Realtime API Beta
- Современный браузер с поддержкой WebRTC

## Установка

### 1. Клонирование репозитория
```bash
git clone https://github.com/yourusername/airine.git
cd airine
```

### 2. Настройка окружения
Создайте файл `.env` в корневой директории проекта:
```env
OPENAI_API_KEY=ваш-ключ-openai-api
```

### 3. Установка зависимостей
```bash
npm install
```

### 4. Запуск приложения
```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`.

## Использование

1. Откройте приложение в браузере: `http://localhost:3000`
2. Разрешите доступ к микрофону при запросе браузера
3. Начните сеанс голосового управления, нажав на кнопку микрофона
4. Используйте следующие голосовые команды:
   - «Перейти к слайду [номер]» — переход к конкретному слайду
   - «Следующий слайд» / «Предыдущий слайд» — навигация между слайдами
   - «Который час» — показ текущего времени
   - «Сменить тему» — переключение между светлой и темной темами
   - «Режим вечеринки» — активация анимированного фона
   - «Расскажи о проекте» — получение информации о проекте AIrine

## Команда разработчиков

- **Игорь Соколов** — Руководитель проекта и ведущий разработчик
- **Ирина Семичасова** — Разработчик и дизайнер


## Развертывание на Vercel

**Развертывание в один клик**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fairine&env=OPENAI_API_KEY&envDescription=OpenAI%20Key%20(Realtime%20API%20Beta%20access)&envLink=https%3A%2F%2Fplatform.openai.com%2Fapi-keys&project-name=airine&repository-name=airine-clone&demo-title=AIrine%20-%20Голосовой%20ассистент%20для%20презентаций&demo-description=Интеллектуальный%20голосовой%20ассистент%20для%20презентаций%20с%20использованием%20OpenAI%20Realtime%20API)

## FAQ

### What hardware is required to run an AIrine node?
AIrine nodes are designed to run on standard Android smartphones and tablets. The system is optimized to work on devices with limited processing power, making it viable even on older or entry-level devices that cannot run GPU-intensive applications.

### How does data synchronization work between nodes?
When an AIrine node detects an internet connection, it can securely connect to other known nodes to download updates and share local data. This mesh networking approach ensures that information propagates through the network gradually, without requiring all nodes to have simultaneous connectivity.

### Can AIrine work in areas with intermittent connectivity?
Yes, AIrine is specifically designed for regions with unreliable or limited connectivity. The system provides full functionality offline and opportunistically synchronizes when connections become available, making it ideal for remote areas with occasional access to mobile networks or satellite internet.

### What types of AI capabilities are available offline?
The local node provides access to essential AI tools including natural language processing, voice recognition, information retrieval, and basic generative AI features - all without requiring internet connectivity. The specific capabilities are optimized to run efficiently on mobile hardware.

### What languages are supported?
Currently, AIrine supports Russian (primary) and English. The modular architecture allows for relatively simple addition of new languages as the project develops.


## Лицензия
Этот проект распространяется под лицензией MIT. Подробности см. в файле `LICENSE`.

## Благодарности
- [OpenAI](https://openai.com/) за их API и модели
- [Next.js](https://nextjs.org/) за фреймворк
- [Tailwind CSS](https://tailwindcss.com/) за стилизацию
- [shadcn/ui](https://ui.shadcn.com/) за компоненты пользовательского интерфейса
- [Framer Motion](https://www.framer.com/motion/) за анимации