# DocsProcherc - Web Project with Firebase Integration

Красивый веб-сайт с анимациями и Firebase интеграцией.

## Firebase Интеграция

### Установленные компоненты:
- ✅ Firebase CLI (глобально)
- ✅ Firebase SDK (через CDN)
- ✅ Firebase Analytics
- ✅ Автоматическое отслеживание событий

### Отслеживаемые события:

1. **page_view** - Просмотр страницы
   - page_title: Название страницы
   - page_location: URL страницы
   - language: Текущий язык
   - user_id: ID пользователя (если авторизован)
   - is_anonymous: Анонимный пользователь

2. **tab_switch** - Переключение вкладок
   - tab_name: Название вкладки (player, hitbox, server, time)
   - language: Текущий язык

3. **language_switch** - Переключение языка
   - language: Выбранный язык (ru, en)

4. **user_auth** - Аутентификация пользователя
   - auth_type: Тип аутентификации (login, register, guest)
   - user_id: ID пользователя
   - is_anonymous: Анонимный пользователь
   - email: Email пользователя

### Firebase Конфигурация

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB8lNIi3oxy0ChMy2AK2U2C5S8oy-P7bhY",
  authDomain: "procherdocs.firebaseapp.com",
  projectId: "procherdocs",
  storageBucket: "procherdocs.firebasestorage.app",
  messagingSenderId: "679242787524",
  appId: "1:679242787524:web:2f6b9e3e9254ef7f667791",
  measurementId: "G-4TM0T7C0C7"
};
```

### Как использовать Firebase CLI

1. **Инициализация проекта:**
   ```bash
   firebase init
   ```

2. **Развертывание на Firebase Hosting:**
   ```bash
   firebase deploy
   ```

3. **Локальный сервер:**
   ```bash
   firebase serve
   ```

### Структура проекта

```
DocsProcherc/
├── main.html          # Главная страница с Firebase SDK
├── package.json       # Зависимости (Firebase SDK)
└── README.md         # Документация
```

### Запуск проекта

1. Откройте `main.html` в браузере
2. Firebase Analytics автоматически начнет сбор данных
3. Проверьте события в Firebase Console

### Firebase Console

Для просмотра аналитики:
1. Перейдите в [Firebase Console](https://console.firebase.google.com/)
2. Выберите проект "procherdocs"
3. Перейдите в раздел "Analytics"
4. Просмотрите события и пользовательскую активность

## Особенности

- Красивый градиентный фон с анимированными частицами
- Эффект стекла (glassmorphism)
- Адаптивный дизайн
- Поддержка двух языков (Русский/English)
- Интерактивные вкладки с анимациями
- Реальное время

## Система Аутентификации

### Функции:
- ✅ Экран входа/регистрации
- ✅ Поддержка email/password аутентификации
- ✅ Анонимный вход (гость)
- ✅ Валидация форм
- ✅ Обработка ошибок
- ✅ Автоматическое переключение между экранами

### Типы аутентификации:
1. **Регистрация** - Создание нового аккаунта с email и паролем
2. **Вход** - Авторизация существующего пользователя
3. **Гость** - Анонимный доступ без регистрации

### Безопасность:
- Валидация email формата
- Проверка совпадения паролей при регистрации
- Обработка сетевых ошибок
- Защита основного интерфейса до авторизации
