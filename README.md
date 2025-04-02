# Погодное приложение

Современное погодное приложение, построенное с использованием Next.js 14, TypeScript и OpenWeatherMap API.

## Технологии

- Next.js 14 (App Router)
- TypeScript 5.3
- Zustand для state management
- Axios + OpenWeatherMap API
- SCSS Modules + Bootstrap
- ESLint + Prettier + Stylelint

## Функциональность

- Поиск погоды по названию города
- Отображение текущей погоды
- Прогноз погоды на 5 дней
- Избранные города
- Адаптивный дизайн
- Скелетоны при загрузке
- Обработка ошибок

## Установка

1. Клонируйте репозиторий:

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

2. Установите зависимости:

```bash
npm install
```

3. Создайте файл `.env.local` в корне проекта и добавьте ваш API ключ OpenWeatherMap:

```
NEXT_PUBLIC_OWM_KEY=your_api_key
```

4. Запустите приложение в режиме разработки:

```bash
npm run dev
```

5. Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере.

## Скрипты

- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка для продакшена
- `npm run start` - запуск собранного приложения
- `npm run lint` - проверка кода линтерами
- `npm run type-check` - проверка типов TypeScript
- `npm run analyze` - анализ бандла

## Структура проекта

```
src/
├── app/
│   ├── (main)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── forecast/
│   └── api/
├── stores/
│   └── weather.store.ts
├── services/
│   └── weather.api.ts
├── types/
│   └── weather.d.ts
└── components/
    ├── WeatherCard/
    └── SearchBar/
```

## Лицензия

MIT
