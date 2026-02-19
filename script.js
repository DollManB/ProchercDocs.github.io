(function() {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB8lNIi3oxy0ChMy2AK2U2C5S8oy-P7bhY",
    authDomain: "procherdocs.firebaseapp.com",
    databaseURL: "https://procherdocs-default-rtdb.firebaseio.com",
    projectId: "procherdocs",
    storageBucket: "procherdocs.firebasestorage.app",
    messagingSenderId: "679242787524",
    appId: "1:679242787524:web:2f6b9e3e9254ef7f667791",
    measurementId: "G-4TM0T7C0C7"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database = firebase.database();
  const storage = firebase.storage();
  const analytics = firebase.analytics();

  // Default values
  const DEFAULT_AVATAR = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGFA_-SJuY6WvY2hW4vYTPIwGTgsIvqFPnSA&s";
  const DEFAULT_BACKGROUND = "radial-gradient(circle at 20% 30%, #1a1a2e, #16213e, #0f3460)";
  
  // Элементы
  const authScreen = document.getElementById('auth-screen');
  const mainContent = document.getElementById('main-content');
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginError = document.getElementById('login-error');
  const registerError = document.getElementById('register-error');
  const guestBtn = document.getElementById('guest-btn');
  const logoutBtn = document.getElementById('logout-btn');

  // Элементы профиля
  const headerAvatar = document.getElementById('header-avatar');
  const headerNickname = document.getElementById('header-nickname');
  const headerEmail = document.getElementById('header-email');
  const headerPremiumBadge = document.getElementById('header-premium-badge');
  
  const profileAvatar = document.getElementById('profile-avatar');
  const profileNickname = document.getElementById('profile-nickname');
  const profileEmail = document.getElementById('profile-email');
  const profilePremium = document.getElementById('profile-premium');
  const profilePremiumBadge = document.getElementById('profile-premium-badge');
  const profileDescription = document.getElementById('profile-description');
  
  // Элементы настроек
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const searchResults = document.getElementById('search-results');
  
  // Элементы для ссылок
  const avatarUrlInput = document.getElementById('avatar-url');
  const updateAvatarUrlBtn = document.getElementById('update-avatar-url');
  
  const settingsNickname = document.getElementById('settings-nickname');
  const updateSettingsNickname = document.getElementById('update-settings-nickname');
  const settingsEmail = document.getElementById('settings-email');
  const updateSettingsEmail = document.getElementById('update-settings-email');
  const settingsDescription = document.getElementById('settings-description');
  const updateDescription = document.getElementById('update-description');
  
  const backgroundUrl = document.getElementById('background-url');
  const updateBackgroundUrl = document.getElementById('update-background-url');
  const resetBackground = document.getElementById('reset-background');
  
  const deleteAccountBtn = document.getElementById('delete-account');
  const themeBtns = document.querySelectorAll('.theme-btn');
  const languageSelect = document.getElementById('language-select');

  // Модальное окно
  const modal = document.getElementById('profile-modal');
  const modalBackground = document.getElementById('modal-background');
  const modalProfile = document.getElementById('modal-profile');

  // Кастомные уведомления
  const toast = document.getElementById('custom-toast');
  const toastMessage = toast.querySelector('.toast-message');
  const toastIcon = toast.querySelector('.toast-icon');
  const toastProgress = toast.querySelector('.toast-progress');

  // Кастомное подтверждение
  const confirmModal = document.getElementById('custom-confirm');
  const confirmOverlay = confirmModal.querySelector('.confirm-overlay');
  const confirmContent = confirmModal.querySelector('.confirm-content');
  const confirmMessage = confirmModal.querySelector('.confirm-message');
  const confirmCancelBtn = confirmModal.querySelector('.confirm-cancel');
  const confirmOkBtn = confirmModal.querySelector('.confirm-ok');

  let confirmResolve = null;

  // Текущий язык
  let currentLang = 'ru';

  // Функция показа уведомления
  function showToast(message, type = 'info', duration = 3000) {
    toast.className = 'toast';
    toast.classList.add('show', type);
    toastMessage.textContent = message;
    
    // Сброс анимации прогресса
    const newProgress = toastProgress.cloneNode(true);
    toastProgress.parentNode.replaceChild(newProgress, toastProgress);
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // Функция показа подтверждения
  function showConfirm(message) {
    return new Promise((resolve) => {
      confirmMessage.textContent = message;
      confirmModal.classList.add('show');
      confirmResolve = resolve;
    });
  }

  // Обработчики для модального окна подтверждения
  confirmCancelBtn.addEventListener('click', () => {
    confirmModal.classList.remove('show');
    if (confirmResolve) {
      confirmResolve(false);
      confirmResolve = null;
    }
  });

  confirmOkBtn.addEventListener('click', () => {
    confirmModal.classList.remove('show');
    if (confirmResolve) {
      confirmResolve(true);
      confirmResolve = null;
    }
  });

  confirmOverlay.addEventListener('click', () => {
    confirmModal.classList.remove('show');
    if (confirmResolve) {
      confirmResolve(false);
      confirmResolve = null;
    }
  });

  // Функция открытия модального окна с профилем
  window.openUserProfile = function(uid) {
    database.ref('users/' + uid).once('value', (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        const avatar = userData.avatar || DEFAULT_AVATAR;
        const nickname = userData.nickname || t('user', currentLang);
        const email = userData.email || t('noEmail', currentLang);
        const premium = userData.premium || false;
        const description = userData.description || t('', currentLang);
        const background = userData.background || DEFAULT_BACKGROUND;
        
        // Устанавливаем фон модального окна (блюр)
        if (background.startsWith('http')) {
          modalBackground.style.background = `url('${background}')`;
        } else {
          // Для градиентов используем тот же градиент
          modalBackground.style.background = background;
        }
        
        // Проверяем, является ли это профиль текущего пользователя
        const currentUser = auth.currentUser;
        const isOwnProfile = currentUser && currentUser.uid === uid;
        
        // Формируем HTML в зависимости от того, чей это профиль
        let emailHtml = '';
        if (isOwnProfile) {
          emailHtml = `
            <div class="modal-detail">
              <div class="modal-detail-label"><i class="fas fa-envelope"></i> ${t('profileEmail', currentLang)}</div>
              <div class="modal-detail-value">${email}</div>
            </div>
          `;
        }
        
        modalProfile.innerHTML = `
          <img src="${avatar}" class="modal-avatar" alt="Avatar">
          <div class="modal-name">
            ${nickname}
            ${premium ? '<img src="https://liderposm.ru/upload/iblock/ec4/6o0uuv1axgtdzsf9q6c0bti4r2eu6pk6/Galochka.png" class="modal-premium-badge">' : ''}
          </div>
          ${emailHtml}
          <div class="modal-detail">
            <div class="modal-detail-label"><i class="fas fa-quote-right"></i> ${t('profileDescription', currentLang)}</div>
            <div class="modal-detail-value">${description}</div>
          </div>
          <div class="modal-detail">
            <div class="modal-detail-label"><i class="fas fa-crown"></i> ${t('profilePremium', currentLang)}</div>
            <div class="modal-detail-value">${premium ? t('profileActive', currentLang) : t('profileNotActive', currentLang)}</div>
          </div>
        `;
        
        modal.classList.add('active');
      }
    });
  };

  // Закрытие модального окна
  window.closeModal = function() {
    modal.classList.remove('active');
    modalBackground.style.background = '';
  };

  // Закрытие по клику вне модального окна
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Переключение между формами
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      authForms.forEach(f => f.classList.remove('active'));
      
      tab.classList.add('active');
      const tabType = tab.getAttribute('data-tab');
      document.getElementById(tabType + '-form').classList.add('active');
    });
  });

  // Форма входа
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      
      // Проверяем, есть ли пользователь в БД
      const snapshot = await database.ref('users/' + userCredential.user.uid).once('value');
      if (!snapshot.exists()) {
        await database.ref('users/' + userCredential.user.uid).set({
          nickname: userCredential.user.displayName || t('user', currentLang),
          email: email,
          avatar: DEFAULT_AVATAR,
          background: DEFAULT_BACKGROUND,
          description: '',
          premium: false,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        });
      }
      
      await handleAuthSuccess(userCredential.user, 'login');
    } catch (error) {
      loginError.textContent = getAuthErrorMessage(error.code);
      setTimeout(() => loginError.textContent = '', 5000);
    }
  });

  // Форма регистрации
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    
    if (password !== confirmPassword) {
      registerError.textContent = t('passwordsNotMatch', currentLang);
      return;
    }
    
    try {
      // Проверяем, существует ли уже пользователь с таким никнеймом
      const usersRef = database.ref('users');
      const snapshot = await usersRef.once('value');
      const users = snapshot.val();
      
      if (users) {
        for (const [uid, userData] of Object.entries(users)) {
          if (userData.nickname && userData.nickname.toLowerCase() === name.toLowerCase()) {
            registerError.textContent = t('nicknameExists', currentLang);
            return;
          }
        }
      }
      
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      
      await userCredential.user.updateProfile({
        displayName: name
      });
      
      await database.ref('users/' + userCredential.user.uid).set({
        nickname: name,
        email: email,
        avatar: DEFAULT_AVATAR,
        background: DEFAULT_BACKGROUND,
        description: '',
        premium: false,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
      
      await handleAuthSuccess(userCredential.user, 'register');
    } catch (error) {
      registerError.textContent = getAuthErrorMessage(error.code);
      setTimeout(() => registerError.textContent = '', 5000);
    }
  });

  // Выход
  logoutBtn.addEventListener('click', async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  });

  // Обновление аватара по ссылке
  updateAvatarUrlBtn.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    const avatarUrl = avatarUrlInput.value.trim();
    if (!avatarUrl) {
      showToast(t('enterAvatarUrl', currentLang), 'warning');
      return;
    }
    
    try {
      await database.ref('users/' + user.uid + '/avatar').set(avatarUrl);
      showToast(t('avatarUpdated', currentLang), 'success');
      avatarUrlInput.value = '';
    } catch (error) {
      console.error('Ошибка обновления аватара:', error);
      showToast(t('avatarError', currentLang), 'error');
    }
  });

  // Обновление никнейма
  updateSettingsNickname.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    const newNickname = settingsNickname.value.trim();
    if (!newNickname) {
      showToast(t('enterNickname', currentLang), 'warning');
      return;
    }
    
    try {
      await database.ref('users/' + user.uid + '/nickname').set(newNickname);
      await user.updateProfile({ displayName: newNickname });
      showToast(t('nicknameUpdated', currentLang), 'success');
      settingsNickname.value = '';
    } catch (error) {
      console.error('Ошибка обновления никнейма:', error);
      showToast(t('nicknameError', currentLang), 'error');
    }
  });

  // Обновление email
  updateSettingsEmail.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    const newEmail = settingsEmail.value.trim();
    if (!newEmail) {
      showToast(t('enterEmail', currentLang), 'warning');
      return;
    }
    
    try {
      await user.updateEmail(newEmail);
      await database.ref('users/' + user.uid + '/email').set(newEmail);
      showToast(t('emailUpdated', currentLang), 'success');
      settingsEmail.value = '';
    } catch (error) {
      console.error('Ошибка обновления email:', error);
      showToast(t('emailError', currentLang), 'error');
    }
  });

  // Обновление описания
  updateDescription.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    const description = settingsDescription.value.trim();
    
    try {
      await database.ref('users/' + user.uid + '/description').set(description);
      showToast(t('descriptionUpdated', currentLang), 'success');
    } catch (error) {
      console.error('Ошибка обновления описания:', error);
      showToast(t('descriptionError', currentLang), 'error');
    }
  });

  // Обновление фона по ссылке
  updateBackgroundUrl.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    const bgUrl = backgroundUrl.value.trim();
    if (!bgUrl) {
      showToast(t('enterBackgroundUrl', currentLang), 'warning');
      return;
    }
    
    try {
      await database.ref('users/' + user.uid + '/background').set(bgUrl);
      document.body.style.background = `url('${bgUrl}')`;
      document.body.classList.add('background-custom');
      showToast(t('backgroundUpdated', currentLang), 'success');
      backgroundUrl.value = '';
    } catch (error) {
      console.error('Ошибка обновления фона:', error);
      showToast(t('backgroundError', currentLang), 'error');
    }
  });

  // Сброс фона
  resetBackground.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    try {
      await database.ref('users/' + user.uid + '/background').set(DEFAULT_BACKGROUND);
      document.body.style.background = DEFAULT_BACKGROUND;
      document.body.classList.remove('background-custom');
      showToast(t('backgroundReset', currentLang), 'success');
    } catch (error) {
      console.error('Ошибка сброса фона:', error);
      showToast(t('backgroundError', currentLang), 'error');
    }
  });

  // Удаление аккаунта
  deleteAccountBtn.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    const confirmed = await showConfirm(t('confirmDelete', currentLang));
    
    if (!confirmed) return;
    
    try {
      // Удаляем файлы из Storage
      try {
        const avatarRef = storage.ref().child(`avatars/${user.uid}`);
        const backgroundRef = storage.ref().child(`backgrounds/${user.uid}`);
        
        const [avatarList, backgroundList] = await Promise.all([
          avatarRef.listAll(),
          backgroundRef.listAll()
        ]);
        
        const deletePromises = [
          ...avatarList.items.map(item => item.delete()),
          ...backgroundList.items.map(item => item.delete())
        ];
        
        await Promise.all(deletePromises);
      } catch (storageError) {
        console.error('Ошибка удаления файлов:', storageError);
      }
      
      // Удаляем данные из БД
      await database.ref('users/' + user.uid).remove();
      await user.delete();
      
      showToast(t('accountDeleted', currentLang), 'success');
    } catch (error) {
      console.error('Ошибка удаления аккаунта:', error);
      showToast(t('accountError', currentLang), 'error');
    }
  });

  // Смена темы
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const theme = btn.dataset.theme;
      let gradient;
      
      switch(theme) {
        case 'dark':
          gradient = 'radial-gradient(circle at 20% 30%, #1a1a2e, #16213e, #0f3460)';
          break;
        case 'light':
          gradient = 'radial-gradient(circle at 20% 30%, #e0e0e0, #b0b0b0, #808080)';
          break;
        case 'purple':
          gradient = 'radial-gradient(circle at 20% 30%, #2e1a2e, #3e1621, #600f34)';
          break;
        case 'blue':
          gradient = 'radial-gradient(circle at 20% 30%, #1a2e3e, #162e3e, #0f3460)';
          break;
        case 'green':
          gradient = 'radial-gradient(circle at 20% 30%, #1a2e1a, #163e16, #0f340f)';
          break;
        default:
          gradient = DEFAULT_BACKGROUND;
      }
      
      document.body.style.background = gradient;
      document.body.classList.remove('background-custom');
      
      const user = auth.currentUser;
      if (user) {
        database.ref('users/' + user.uid + '/background').set(gradient);
      }
    });
  });

  // Смена языка через select
  languageSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    if (lang === 'ru') {
      document.getElementById('lang-ru').click();
    } else {
      document.getElementById('lang-en').click();
    }
  });

  // Поиск пользователей
  searchBtn.addEventListener('click', async () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) {
      searchResults.innerHTML = '<p style="color: white; text-align: center; grid-column: 1/-1;">' + t('enterNickname', currentLang) + '</p>';
      return;
    }
    
    searchResults.innerHTML = '<p style="color: white; text-align: center; grid-column: 1/-1;">' + t('loading', currentLang) + '...</p>';
    
    try {
      const usersRef = database.ref('users');
      const snapshot = await usersRef.once('value');
      const users = snapshot.val();
      
      const results = [];
      
      for (const [uid, userData] of Object.entries(users)) {
        if (userData.nickname && userData.nickname.toLowerCase().includes(searchTerm)) {
          results.push({ uid, ...userData });
        }
      }
      
      if (results.length === 0) {
        searchResults.innerHTML = '<p style="color: white; text-align: center; grid-column: 1/-1;">' + t('noUsersFound', currentLang) + '</p>';
        return;
      }
      
      let html = '';
      results.forEach(user => {
        html += `
          <div class="user-card" onclick="openUserProfile('${user.uid}')">
            <img src="${user.avatar || DEFAULT_AVATAR}" class="user-avatar" alt="Avatar">
            <div class="user-info">
              <div class="user-name">
                ${user.nickname}
                ${user.premium ? '<img src="https://liderposm.ru/upload/iblock/ec4/6o0uuv1axgtdzsf9q6c0bti4r2eu6pk6/Galochka.png" class="premium-badge">' : ''}
              </div>
              ${user.description ? `<div class="user-description">${user.description.substring(0, 50)}${user.description.length > 50 ? '...' : ''}</div>` : ''}
            </div>
          </div>
        `;
      });
      
      searchResults.innerHTML = html;
    } catch (error) {
      console.error('Ошибка поиска:', error);
      searchResults.innerHTML = '<p style="color: #ff4757; text-align: center; grid-column: 1/-1;">' + t('searchError', currentLang) + '</p>';
    }
  });

  // Поиск по Enter
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });

  // Обработка успешной аутентификации
  async function handleAuthSuccess(user, authType) {
    if (analytics) {
      analytics.logEvent('user_auth', {
        auth_type: authType,
        user_id: user.uid,
        is_anonymous: user.isAnonymous
      });
    }
  }

  // Загрузка данных пользователя
  function loadUserData(user) {
    const userRef = database.ref('users/' + user.uid);
    
    userRef.on('value', (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        const avatar = userData.avatar || DEFAULT_AVATAR;
        const nickname = userData.nickname || (user.isAnonymous ? t('guest', currentLang) : t('user', currentLang));
        const email = userData.email || (user.email || t('noEmail', currentLang));
        const premium = userData.premium || false;
        const background = userData.background;
        const description = userData.description || t('noDescription', currentLang);
        
        // Обновляем шапку
        headerAvatar.src = avatar;
        headerNickname.textContent = nickname;
        headerEmail.textContent = email;
        
        // Обновляем профиль
        profileAvatar.src = avatar;
        profileNickname.textContent = nickname;
        profileEmail.textContent = email;
        profileDescription.textContent = description;
        
        // Обновляем premium статус
        if (premium) {
          headerPremiumBadge.style.display = 'inline';
          profilePremiumBadge.style.display = 'inline';
          profilePremium.textContent = t('profileActive', currentLang);
          profilePremium.className = 'premium-status premium-true';
        } else {
          headerPremiumBadge.style.display = 'none';
          profilePremiumBadge.style.display = 'none';
          profilePremium.textContent = t('profileNotActive', currentLang);
          profilePremium.className = 'premium-status premium-false';
        }
        
        // Обновляем фон
        if (background && background.startsWith('http')) {
          document.body.style.background = `url('${background}')`;
          document.body.classList.add('background-custom');
        } else if (background) {
          document.body.style.background = background;
          document.body.classList.remove('background-custom');
        }
        
        // Заполняем поля настроек
        settingsNickname.value = nickname;
        settingsEmail.value = email;
        settingsDescription.value = userData.description || '';
      }
    }, (error) => {
      console.error('Ошибка загрузки данных:', error);
      if (error.code === 'PERMISSION_DENIED') {
        showToast(t('dbAccessError', currentLang), 'error');
      }
    });
  }

  // Обработка состояния аутентификации
  auth.onAuthStateChanged((user) => {
    if (user) {
      authScreen.style.display = 'none';
      mainContent.style.display = 'block';
      loadUserData(user);
      
      if (analytics) {
        analytics.logEvent('page_view', {
          page_title: document.title,
          page_location: window.location.href,
          user_id: user.uid,
          is_anonymous: user.isAnonymous
        });
      }
    } else {
      authScreen.style.display = 'flex';
      mainContent.style.display = 'none';
    }
  });

  // Функция для получения понятных сообщений об ошибках
  function getAuthErrorMessage(errorCode) {
    switch (errorCode) {
      case 'auth/invalid-email':
        return t('authInvalidEmail', currentLang);
      case 'auth/user-not-found':
        return t('authUserNotFound', currentLang);
      case 'auth/wrong-password':
        return t('authWrongPassword', currentLang);
      case 'auth/email-already-in-use':
        return t('authEmailInUse', currentLang);
      case 'auth/weak-password':
        return t('authWeakPassword', currentLang);
      case 'auth/network-request-failed':
        return t('authNetworkError', currentLang);
      default:
        return t('authGenericError', currentLang);
    }
  }

  // Элементы для перевода
  const langRuBtn = document.getElementById('lang-ru');
  const langEnBtn = document.getElementById('lang-en');
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  const tabTextSpans = document.querySelectorAll('.tab .tab-text');
  const langBtns = document.querySelectorAll('.lang-btn');

  // Функция перевода (используем глобальную)
  function updateLanguage(lang) {
    currentLang = lang;
    langBtns.forEach(btn => btn.classList.remove('active'));
    if (lang === 'ru') langRuBtn.classList.add('active');
    else langEnBtn.classList.add('active');

    // Используем глобальную функцию setLanguage из translations.js
    if (typeof window.setLanguage === 'function') {
      window.setLanguage(lang);
    }
    
    if (languageSelect) {
      languageSelect.value = lang;
    }
  }

  langRuBtn.addEventListener('click', () => {
    updateLanguage('ru');
    if (analytics) {
      analytics.logEvent('language_switch', { language: 'ru' });
    }
  });
  
  langEnBtn.addEventListener('click', () => {
    updateLanguage('en');
    if (analytics) {
      analytics.logEvent('language_switch', { language: 'en' });
    }
  });

  // Логика вкладок
  function switchTab(tabId) {
    contents.forEach(content => {
      content.classList.remove('active-content');
    });
    document.getElementById(tabId).classList.add('active-content');

    tabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.getAttribute('data-tab') === tabId) {
        tab.classList.add('active');
      }
    });

    if (analytics) {
      analytics.logEvent('tab_switch', {
        tab_name: tabId,
        language: currentLang
      });
    }
  }

  window.switchTab = switchTab;

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const tabId = tab.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  switchTab('player');

  // Часы
  function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ru-RU', { hour12: false });
    const dateStr = now.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeEl = document.getElementById('liveTime');
    const dateEl = document.getElementById('liveDate');
    if (timeEl) timeEl.textContent = timeStr;
    if (dateEl) dateEl.textContent = dateStr;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Инициализация языка
  updateLanguage('ru');

  const container = document.querySelector('.content-container');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      container.style.animation = 'none';
      container.offsetHeight;
      container.style.animation = 'fadeInScale 0.5s ease-out';
    });
  });
})();