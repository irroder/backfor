# Task Manager API

REST API для менеджера задач, построенный на Express.js + TypeScript и готовый к деплою на Vercel.

## 🚀 API Endpoints

-   `GET /` - Health check
-   `GET /api/tasks` - Получить все задачи
-   `GET /api/tasks/:id` - Получить задачу по ID
-   `POST /api/tasks` - Создать новую задачу
-   `PUT /api/tasks/:id` - Обновить задачу
-   `DELETE /api/tasks/:id` - Удалить задачу

## 📝 Структура Task

```typescript
interface Task {
	id: string;
	title: string;
	description: string;
	category: "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
	status: "To Do" | "In Progress" | "Done";
	priority: "Low" | "Medium" | "High";
	createdAt: string;
	updatedAt: string;
}
```

## 🛠️ Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка проекта
npm run build

# Запуск production версии
npm start
```

## 📦 Деплой на Vercel

### Через Vercel CLI

1. Установите Vercel CLI:

```bash
npm i -g vercel
```

2. Войдите в аккаунт:

```bash
vercel login
```

3. Локальная разработка с Vercel:

```bash
vercel dev
```

4. Деплой:

```bash
vercel
```

### Через GitHub

1. Подключите репозиторий к Vercel
2. Vercel автоматически деплоит при push в main ветку

## 🏗️ Структура проекта

```
back/
├── api/
│   └── index.ts          # Главный файл для Vercel
├── src/
│   ├── types/
│   │   └── index.ts      # TypeScript интерфейсы
│   └── store/
│       └── tasks.ts      # Данные задач
├── vercel.json           # Конфигурация Vercel
├── package.json
└── README.md
```

## 🔧 Технологии

-   **Express.js** - Web framework
-   **TypeScript** - Type safety
-   **CORS** - Cross-origin requests
-   **Vercel** - Serverless deployment

## 📋 TODO

-   [ ] Подключение базы данных
-   [ ] Аутентификация
-   [ ] Rate limiting
-   [ ] Логирование
-   [ ] Тестирование
# backfor
