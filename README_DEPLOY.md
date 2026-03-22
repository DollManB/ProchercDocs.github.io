# Деплой ProchercDocs

## Проблема permission_denied — ЧИТАЙ СЮДА ПЕРВЫМ ДЕЛОМ

Ошибка `permission_denied at /users/...` означает что Realtime Database Rules
заблокированы. Нужно обновить правила в Firebase Console.

### Способ 1 — через Firebase Console (быстрый)

1. Открой https://console.firebase.google.com
2. Выбери проект procherdocs
3. Слева: Build → Realtime Database → Rules
4. Замени ВСЁ содержимое на содержимое файла `database.rules.json` из этой папки
5. Нажми Publish

### Способ 2 — через Firebase CLI (правильный)

Установи Firebase CLI если нет:
  npm install -g firebase-tools

Залогинься:
  firebase login

Задеплой только rules:
  firebase deploy --only database

---

## Сайт не работает при открытии через файл (file://)

Firebase не работает через file:// из-за CORS.
ВСЕГДА нужен либо локальный HTTP-сервер, либо деплой на Firebase Hosting.

### Запуск локально (без деплоя)

Вариант 1 — Firebase Hosting эмулятор:
  firebase serve

Вариант 2 — простой HTTP-сервер через Node.js:
  npx serve .

Вариант 3 — Python:
  python -m http.server 8080
  Открой: http://localhost:8080

Вариант 4 — VS Code расширение "Live Server"
  ПКМ на index.html → Open with Live Server

---

## Полный деплой на Firebase Hosting

  firebase deploy

После этого сайт будет доступен по адресу:
  https://procherdocs.web.app

---

## Структура rules файлов

database.rules.json  → Realtime Database (пользователи, индексы)
firestore.rules      → Firestore (сообщества, посты, комментарии)
storage.rules        → Firebase Storage (аватарки, фоны)
firebase.json        → конфигурация деплоя (ссылает на все rules файлы)
