/**
 * Переводы для интерфейса
 * Поддержка русского (ru) и английского (en) языков
 */

const translations = {
  ru: {
    // Вкладки
    tabPlayer: 'Игрок',
    tabHitbox: 'Хитбокс',
    tabServer: 'Сервер',
    tabTime: 'Время',
    tabProfile: 'Профиль',
    tabSettings: 'Настройки',

    // Игрок API
    playerApiTitle: 'Player API',
    playerApiDescription: 'Player API предоставляет полный набор инструментов для работы с игроками в игре. Этот API позволяет управлять всеми аспектами игрока: от базовой информации до сложных взаимодействий.',
    playerApiBestPractices: 'Лучшие практики',
    playerApiLimitations: 'Ограничения',
    playerApiMethods: 'Методы API',
    playerApiGetName: 'getName()',
    playerApiGetNameDesc: 'Получить имя игрока',
    playerApiSendMessage: 'sendMessage(text)',
    playerApiSendMessageDesc: 'Игрок может разговаривать, выводить сообщение в чат',
    playerApiGetServerPlayer: 'getServerPlayer()',
    playerApiGetServerPlayerDesc: 'Получить ServerPlayerEntity - компонент игрока зависящий от net.minecraft.server.network',
    playerApiServerPlayerLink: 'Полную информацию можно посмотреть тут',
    playerApiCheckNull: 'Проверяйте возвращаемые значения на null/undefined',
    playerApiNotWorkingEntities: 'Некоторые методы могут не работать с не-игровыми сущностями',
    playerApiInventoryConflicts: 'Модификации инвентаря могут конфликтовать с другими модами',
    playerApiPhysicsSync: 'Физические изменения могут не синхронизироваться в реальном времени в мультиплеере',

    // Хитбокс API
    hitboxApiTitle: 'HitboxAPI',
    hitboxApiDescription: 'API который поможет вам в разработке своим хитбоксом, он выполняет две функции: InteractTrigger и enteredTrigger',
    hitboxInteractTrigger: 'interactTrigger',
    hitboxInteractTriggerDesc: 'Работает по нажатию ПКМ по хитбоксу',
    hitboxEnteredTrigger: 'enteredTrigger',
    hitboxEnteredTriggerDesc: 'Работает когда игрок зашел в триггер',
    hitboxRemove: 'Удаление хитбокса',
    hitboxRemoveDesc: 'А так же можно убирать его',
    hitboxRecommendations: 'Рекомендации по использованию',
    hitboxInteractForObjects: 'Используйте interactTrigger для интерактивных объектов (двери, кнопки, сундуки)',
    hitboxEnteredForZones: 'Используйте enteredTrigger для зон (лава, вода, телепорты)',
    hitboxMemoryLeaks: 'Не забывайте удалять хитбоксы после окончания раунда и тд, чтобы ничего не багалось',
    hitboxCoordinates: 'Координаты (x, y, z) задают центр хитбокса, а (width, height) - его размеры',
    hitboxLimitations: 'Ограничения',
    hitboxMinSize: 'Минимальный размер хитбокса: 1x1',
    hitboxMaxSize: 'Максимальный размер хитбокса по рекомендации: 10x10(иначе он выйдет слишком большим)',

    // Сервер API
    serverApiTitle: 'Server API',
    serverApiDescription: 'Server API предоставляет мощные инструменты для управления сервером и глобальными игровыми процессами. Этот API позволяет контролировать все аспекты серверной части игры, от управления игроками до выполнения команд и модификации игрового мира.',
    serverApiExecuteCommand: 'executeCommand(command)',
    serverApiExecuteCommandDesc: 'Этот метод позволяет от имени сервера выполнить команду',
    serverApiExecuteCommandNote: 'Необязательно писать через [ / ]',
    serverApiGetOnlinePlayer: 'getOnlinePlayer()',
    serverApiGetOnlinePlayerDesc: 'Получить список игроков (имена)',
    serverApiGetPlayerByName: 'getPlayerByName(nickname)',
    serverApiGetPlayerByNameDesc: 'Получить игрока по имени',
    serverApiGetPlayerByNameNote: 'передает PlayerAPI',
    serverApiGetPlayerByNameNote2: 'после этого теперь player у нас является зависимым от PlayerAPI',
    serverApiGetRandomPlayer: 'getRandomPlayer()',
    serverApiGetRandomPlayerDesc: 'Получить рандомного игрока',
    serverApiGetRandomPlayerNote: 'теперь player у нас становиться зависимым от PlayerAPI',
    serverApiBroadcast: 'broadcast(message)',
    serverApiBroadcastDesc: 'Отправляет сообщение в чат от имени сервера',

    // Time API
    timeApiTitle: 'Time API',
    timeApiDescription: 'Time API предоставляет инструменты для управления временем в игре. Этот API позволяет контролировать игровое время, устанавливать задержки и управлять его потоком.',
    timeApiWait: 'wait(seconds)',
    timeApiWaitDesc: 'Ожидание на указанное количество секунд',
    timeApiFreezeTime: 'freezeTime()',
    timeApiFreezeTimeDesc: 'Замораживает игровое время',
    timeApiFreezeResume: 'freezeResume()',
    timeApiFreezeResumeDesc: 'Восстанавливает нормальное течение времени',
    timeApiSetTime: 'setTime(ticks)',
    timeApiSetTimeDesc: 'Устанавливает время в игре (0-24000)',
    timeApiExamples: 'Примеры использования',
    timeApiSunsetExample: 'Пример: Создать закат через 5 секунд',
    timeApiFreezeExample: 'Пример: Заморозить время на 10 секунд',
    timeApiInfo: 'Информация о времени',
    timeApiTicks: 'Игровое время измеряется в тиках (0-24000)',
    timeApiDawn: 'Рассвет (6:00 утра)',
    timeApiNoon: 'Полдень (12:00 дня)',
    timeApiSunset: 'Закат (6:00 вечера)',
    timeApiMidnight: 'Полночь (12:00 ночи)',
    timeApiFullCycle: 'Полный цикл (возвращается к 0)',
    timeApiRange: 'Время должно быть в диапазоне от 0 до 24000',
    timeApiWaitBlocks: 'Метод wait() блокирует выполнение скрипта на указанное время',
    timeApiServerOnly: 'freezeTime() и freezeResume() работают только на сервере',
    timeApiSyncIssues: 'Изменения времени могут не синхронизироваться мгновенно у всех игроков',

    // Профиль
    profileTitle: '👤 Мой профиль',
    profileNickname: 'Никнейм',
    profileEmail: 'Email',
    profilePremium: 'Premium статус',
    profileDescription: 'Описание',
    profileNotActive: 'Не активен',
    profileActive: 'Активен',

    // Настройки
    settingsTitle: '⚙️ Настройки',
    settingsSearch: 'Поиск пользователей',
    settingsSearchPlaceholder: 'Введите никнейм для поиска...',
    settingsSearchButton: 'Найти',
    settingsProfile: 'Настройки профиля',
    settingsAvatarUrl: 'Ссылка на аватарку',
    settingsSetAvatar: 'Установить аватар',
    settingsNickname: 'Никнейм',
    settingsSaveNickname: 'Сохранить никнейм',
    settingsEmail: 'Email',
    settingsSaveEmail: 'Сохранить email',
    settingsDescription: 'Описание профиля',
    settingsSaveDescription: 'Сохранить описание',
    settingsTheme: 'Тема и фон',
    settingsBackgroundUrl: 'Ссылка на фон профиля',
    settingsSetBackground: 'Установить фон',
    settingsColorScheme: 'Цветовая схема',
    settingsDarkTheme: 'Тёмная',
    settingsLightTheme: 'Светлая',
    settingsPurpleTheme: 'Фиолетовая',
    settingsBlueTheme: 'Синяя',
    settingsGreenTheme: 'Зелёная',
    settingsResetBackground: 'Вернуть стандартный фон',
    settingsLanguage: 'Язык интерфейса',
    settingsDangerZone: 'Опасная зона',
    settingsDeleteAccount: 'Удалить аккаунт',

    // Аутентификация
    authTitle: 'DocsProcherc',
    authWelcome: 'Добро пожаловать! Пожалуйста, войдите или зарегистрируйтесь',
    authLogin: 'Вход',
    authRegister: 'Регистрация',
    authEmail: 'Email',
    authPassword: 'Пароль',
    authName: 'Имя',
    authConfirmPassword: 'Подтвердите пароль',
    authSignIn: 'Войти',
    authSignUp: 'Зарегистрироваться',
    
    // Ошибки аутентификации
    authInvalidEmail: 'Неверный формат email',
    authUserNotFound: 'Пользователь не найден',
    authWrongPassword: 'Неверный пароль',
    authEmailInUse: 'Email уже используется',
    authWeakPassword: 'Пароль слишком слабый (минимум 6 символов)',
    authNetworkError: 'Ошибка сети. Проверьте подключение к интернету',
    authGenericError: 'Произошла ошибка. Попробуйте позже',
    
    // Сообщения об ошибках и успехе
    passwordsNotMatch: 'Пароли не совпадают',
    nicknameExists: 'Пользователь с таким никнеймом уже существует',
    enterAvatarUrl: 'Введите ссылку на аватар',
    avatarUpdated: 'Аватар успешно обновлен!',
    avatarError: 'Ошибка при обновлении аватара',
    enterNickname: 'Введите новый никнейм',
    nicknameUpdated: 'Никнейм успешно обновлен!',
    nicknameError: 'Ошибка при обновлении никнейма',
    enterEmail: 'Введите новый email',
    emailUpdated: 'Email успешно обновлен!',
    emailError: 'Ошибка при обновлении email',
    descriptionUpdated: 'Описание успешно обновлено!',
    descriptionError: 'Ошибка при обновлении описания',
    enterBackgroundUrl: 'Введите ссылку на фон',
    backgroundUpdated: 'Фон успешно обновлен!',
    backgroundError: 'Ошибка при обновлении фона',
    backgroundReset: 'Фон сброшен!',
    confirmDelete: 'Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить!',
    accountDeleted: 'Аккаунт успешно удален',
    accountError: 'Ошибка при удалении аккаунта',
    dbAccessError: 'Доступ к базе данных временно ограничен. Пожалуйста, попробуйте позже.',
    noUsersFound: 'Пользователи не найдены',
    searchError: 'Ошибка при поиске',
    
    // Подтверждение
    confirmTitle: 'Подтверждение действия',
    confirmCancel: 'Отмена',
    confirmOk: 'Подтвердить',

    // Общие
    loading: 'Загрузка',
    noDescription: 'Нет описания',
    russian: 'Русский',
    english: 'English',
    logout: 'Выйти',
    settings: 'Настройки',
    language: 'Язык',
    ru: 'RU',
    en: 'EN',
    guest: 'Гость',
    user: 'Пользователь',
    noEmail: 'Нет email'
  },

  en: {
    // Tabs
    tabPlayer: 'Player',
    tabHitbox: 'Hitbox',
    tabServer: 'Server',
    tabTime: 'Time',
    tabProfile: 'Profile',
    tabSettings: 'Settings',

    // Player API
    playerApiTitle: 'Player API',
    playerApiDescription: 'Player API provides a complete set of tools for working with players in the game. This API allows you to control all aspects of the player: from basic information to complex interactions.',
    playerApiBestPractices: 'Best Practices',
    playerApiLimitations: 'Limitations',
    playerApiMethods: 'API Methods',
    playerApiGetName: 'getName()',
    playerApiGetNameDesc: 'Get player name',
    playerApiSendMessage: 'sendMessage(text)',
    playerApiSendMessageDesc: 'Player can talk, output message to chat',
    playerApiGetServerPlayer: 'getServerPlayer()',
    playerApiGetServerPlayerDesc: 'Get ServerPlayerEntity - player component depending on net.minecraft.server.network',
    playerApiServerPlayerLink: 'Full information can be viewed here',
    playerApiCheckNull: 'Check return values for null/undefined',
    playerApiNotWorkingEntities: 'Some methods may not work with non-player entities',
    playerApiInventoryConflicts: 'Inventory modifications may conflict with other mods',
    playerApiPhysicsSync: 'Physical changes may not synchronize in real time in multiplayer',

    // Hitbox API
    hitboxApiTitle: 'HitboxAPI',
    hitboxApiDescription: 'API that will help you in development with your hitbox, it performs two functions: InteractTrigger and enteredTrigger',
    hitboxInteractTrigger: 'interactTrigger',
    hitboxInteractTriggerDesc: 'Works by right-clicking on the hitbox',
    hitboxEnteredTrigger: 'enteredTrigger',
    hitboxEnteredTriggerDesc: 'Works when a player enters the trigger',
    hitboxRemove: 'Hitbox Removal',
    hitboxRemoveDesc: 'Also you can remove it',
    hitboxRecommendations: 'Recommendations for Use',
    hitboxInteractForObjects: 'Use interactTrigger for interactive objects (doors, buttons, chests)',
    hitboxEnteredForZones: 'Use enteredTrigger for zones (lava, water, teleporters)',
    hitboxMemoryLeaks: 'Don\'t forget to remove hitboxes after the end of the round, etc., so that nothing bugs',
    hitboxCoordinates: 'Coordinates (x, y, z) set the center of the hitbox, and (width, height) - its size',
    hitboxLimitations: 'Limitations',
    hitboxMinSize: 'Minimum hitbox size: 1x1',
    hitboxMaxSize: 'Maximum hitbox size recommended: 10x10 (otherwise it will be too large)',

    // Server API
    serverApiTitle: 'Server API',
    serverApiDescription: 'Server API provides powerful tools for managing the server and global game processes. This API allows you to control all aspects of the server part of the game, from managing players to executing commands and modifying the game world.',
    serverApiExecuteCommand: 'executeCommand(command)',
    serverApiExecuteCommandDesc: 'This method allows you to execute a command on behalf of the server',
    serverApiExecuteCommandNote: 'Not necessary to write through [ / ]',
    serverApiGetOnlinePlayer: 'getOnlinePlayer()',
    serverApiGetOnlinePlayerDesc: 'Get list of players (names)',
    serverApiGetPlayerByName: 'getPlayerByName(nickname)',
    serverApiGetPlayerByNameDesc: 'Get player by name',
    serverApiGetPlayerByNameNote: 'passes PlayerAPI',
    serverApiGetPlayerByNameNote2: 'after this player is now dependent on PlayerAPI',
    serverApiGetRandomPlayer: 'getRandomPlayer()',
    serverApiGetRandomPlayerDesc: 'Get random player',
    serverApiGetRandomPlayerNote: 'now player becomes dependent on PlayerAPI',
    serverApiBroadcast: 'broadcast(message)',
    serverApiBroadcastDesc: 'Sends a message to chat on behalf of the server',

    // Time API
    timeApiTitle: 'Time API',
    timeApiDescription: 'Time API provides tools for managing time in the game. This API allows you to control game time, set delays and manage its flow.',
    timeApiWait: 'wait(seconds)',
    timeApiWaitDesc: 'Wait for the specified number of seconds',
    timeApiFreezeTime: 'freezeTime()',
    timeApiFreezeTimeDesc: 'Freezes game time',
    timeApiFreezeResume: 'freezeResume()',
    timeApiFreezeResumeDesc: 'Restores normal time flow',
    timeApiSetTime: 'setTime(ticks)',
    timeApiSetTimeDesc: 'Sets time in the game (0-24000)',
    timeApiExamples: 'Examples of Use',
    timeApiSunsetExample: 'Example: Create sunset in 5 seconds',
    timeApiFreezeExample: 'Example: Freeze time for 10 seconds',
    timeApiInfo: 'Time Information',
    timeApiTicks: 'Game time is measured in ticks (0-24000)',
    timeApiDawn: 'Dawn (6:00 AM)',
    timeApiNoon: 'Noon (12:00 PM)',
    timeApiSunset: 'Sunset (6:00 PM)',
    timeApiMidnight: 'Midnight (12:00 AM)',
    timeApiFullCycle: 'Full cycle (returns to 0)',
    timeApiRange: 'Time must be in the range from 0 to 24000',
    timeApiWaitBlocks: 'The wait() method blocks script execution for the specified time',
    timeApiServerOnly: 'freezeTime() and freezeResume() work only on the server',
    timeApiSyncIssues: 'Time changes may not synchronize instantly for all players',

    // Profile
    profileTitle: '👤 My Profile',
    profileNickname: 'Nickname',
    profileEmail: 'Email',
    profilePremium: 'Premium status',
    profileDescription: 'Description',
    profileNotActive: 'Not active',
    profileActive: 'Active',

    // Settings
    settingsTitle: '⚙️ Settings',
    settingsSearch: 'Search users',
    settingsSearchPlaceholder: 'Enter nickname to search...',
    settingsSearchButton: 'Find',
    settingsProfile: 'Profile Settings',
    settingsAvatarUrl: 'Avatar URL',
    settingsSetAvatar: 'Set avatar',
    settingsNickname: 'Nickname',
    settingsSaveNickname: 'Save nickname',
    settingsEmail: 'Email',
    settingsSaveEmail: 'Save email',
    settingsDescription: 'Profile description',
    settingsSaveDescription: 'Save description',
    settingsTheme: 'Theme and Background',
    settingsBackgroundUrl: 'Profile background URL',
    settingsSetBackground: 'Set background',
    settingsColorScheme: 'Color scheme',
    settingsDarkTheme: 'Dark',
    settingsLightTheme: 'Light',
    settingsPurpleTheme: 'Purple',
    settingsBlueTheme: 'Blue',
    settingsGreenTheme: 'Green',
    settingsResetBackground: 'Reset to default background',
    settingsLanguage: 'Interface language',
    settingsDangerZone: 'Danger Zone',
    settingsDeleteAccount: 'Delete account',

    // Authentication
    authTitle: 'DocsProcherc',
    authWelcome: 'Welcome! Please sign in or register',
    authLogin: 'Login',
    authRegister: 'Register',
    authEmail: 'Email',
    authPassword: 'Password',
    authName: 'Name',
    authConfirmPassword: 'Confirm Password',
    authSignIn: 'Sign In',
    authSignUp: 'Sign Up',
    
    // Authentication errors
    authInvalidEmail: 'Invalid email format',
    authUserNotFound: 'User not found',
    authWrongPassword: 'Wrong password',
    authEmailInUse: 'Email already in use',
    authWeakPassword: 'Password is too weak (minimum 6 characters)',
    authNetworkError: 'Network error. Check your internet connection',
    authGenericError: 'An error occurred. Please try again later',
    
    // Error and success messages
    passwordsNotMatch: 'Passwords do not match',
    nicknameExists: 'User with this nickname already exists',
    enterAvatarUrl: 'Enter avatar URL',
    avatarUpdated: 'Avatar successfully updated!',
    avatarError: 'Error updating avatar',
    enterNickname: 'Enter new nickname',
    nicknameUpdated: 'Nickname successfully updated!',
    nicknameError: 'Error updating nickname',
    enterEmail: 'Enter new email',
    emailUpdated: 'Email successfully updated!',
    emailError: 'Error updating email',
    descriptionUpdated: 'Description successfully updated!',
    descriptionError: 'Error updating description',
    enterBackgroundUrl: 'Enter background URL',
    backgroundUpdated: 'Background successfully updated!',
    backgroundError: 'Error updating background',
    backgroundReset: 'Background reset!',
    confirmDelete: 'Are you sure you want to delete your account? This action cannot be undone!',
    accountDeleted: 'Account successfully deleted',
    accountError: 'Error deleting account',
    dbAccessError: 'Database access temporarily restricted. Please try again later.',
    noUsersFound: 'No users found',
    searchError: 'Search error',
    
    // Confirm
    confirmTitle: 'Confirm Action',
    confirmCancel: 'Cancel',
    confirmOk: 'Confirm',

    // General
    loading: 'Loading',
    noDescription: 'No description',
    russian: 'Russian',
    english: 'English',
    logout: 'Logout',
    settings: 'Settings',
    language: 'Language',
    ru: 'RU',
    en: 'EN',
    guest: 'Guest',
    user: 'User',
    noEmail: 'No email'
  }
};

// Функция для получения перевода
function t(key, lang = 'ru') {
  if (!translations[lang]) lang = 'ru';
  return translations[lang][key] || translations['ru'][key] || key;
}

// Функция для установки языка
function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key) {
      element.textContent = t(key, lang);
    }
  });
  
  // Обновляем placeholder'ы
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (key) {
      element.placeholder = t(key, lang);
    }
  });
  
  // Обновляем select options
  const selectOptions = document.querySelectorAll('select option[data-i18n]');
  selectOptions.forEach(option => {
    const key = option.getAttribute('data-i18n');
    if (key) {
      option.textContent = t(key, lang);
    }
  });
}

// Экспортируем для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { translations, t, setLanguage };
}