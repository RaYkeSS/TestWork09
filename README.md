# Приложение с Прогнозом погоды

## Стек

- Next.js (App Router)
- TypeScript
- Zustand
- Axios + OpenWeatherMap API
- SCSS Modules + Bootstrap
- ESLint + Prettier + Stylelint

## Функциональность

- Поиск погоды по названию города
- Отображение текущей погоды
- Прогноз погоды на 5 дней
- Избранные города
- Скелетоны при загрузке

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

5. Откройте [http://localhost:3000](http://localhost:3000).

## Скрипты

- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка для продакшена
- `npm run start` - запуск собранного приложения
- `npm run lint` - проверка кода линтерами
-  `npm run lint:style` - проверка стилей линтерами
- `npm run type-check` - проверка типов TypeScript
- `npm run analyze` - анализ бандла
