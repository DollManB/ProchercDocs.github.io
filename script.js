(function() {
  // Firebase configuration
  const firebaseConfig = {
  apiKey: "AIzaSyB8lNIi3oxy0ChMy2AK2U2C5S8oy-P7bhY",
  authDomain: "procherdocs.firebaseapp.com",
  databaseURL: "https://procherdocs-default-rtdb.firebaseio.com",
  projectId: "procherdocs",
  storageBucket: "procherdocs.firebasestorage.app",
  messagingSenderId: "679242787524",
  appId: "1:679242787524:web:2903505183f73ad1667791",
  measurementId: "G-L3CT3D4CZ2"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database = firebase.database();
  const firestore = firebase.firestore();
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

  // Элементы верификации email
  const verifyForm = document.getElementById('verify-form');
  const verifyCodeInput = document.getElementById('verify-code');
  const verifyError = document.getElementById('verify-error');
  const resendCodeBtn = document.getElementById('resend-code');
  const cancelVerifyBtn = document.getElementById('cancel-verify');
  const registerNameInput = document.getElementById('register-name');
  const nameHint = document.getElementById('name-hint');
  
  // Переменные для верификации
  let pendingVerification = null;
  let verificationCode = null;
  
  // Список временных email доменов
  const disposableEmailDomains = [
    'tempmail.com', '10minutemail.com', 'guerrillamail.com', 'mailinator.com',
    'throwaway.email', 'fakeinbox.com', 'trashmail.com', 'getnada.com',
    'yopmail.com', 'temp-mail.org', 'maildrop.cc', 'dispostable.com',
    'sharklasers.com', 'spam4.me', 'grr.la', 'mailnesia.com',
    'mailcatch.com', 'spamfree24.org', 'mintemail.com', 'tempemail.net',
    'emailondeck.com', 'tempail.com', 'emailfake.com', 'throwawaymail.com',
    'tempinbox.com', 'mohmal.com', 'temp.email', 'fake-email.com',
    'mail-temporaire.fr', 'mytrashmail.com', 'spamgourmet.com', 'meltmail.com',
    'spaml.com', 'spamcowboy.com', 'spamcowboy.net', 'jetable.org',
    'kasmail.com', 'spammotel.com', 'sogetthis.com', 'mailin8r.com',
    'mailinator.net', 'sofimail.com', 'spamherlotons.com', 'teddydating.com',
    'emailwarden.com', 'spamify.com', 'dodgeit.com', 'dodgit.com',
    'spamjam.com', 'spaml.com', 'spamnator.net', 'mailzilla.com',
    'mbx.cc', 'emailtemporario.com.br', 'tempemailaddress.com', 'instant-mail.de',
    'temp-mail.io', 'email-temp.com', 'tmpmail.org', 'tmpmail.net',
    'tmpmail.com', 'disposeamail.com', 'spamgourmet.org', 'spamlassa.com'
  ];
  
  // Значок бана - используем Font Awesome иконку
  const BAN_BADGE_ICON = '<i class="fas fa-gavel" style="color: #ff4757; font-size: 14px;"></i>';
  
  // ID админа
  const ADMIN_EMAIL = 'dollmanb1337@gmail.com';
  
  // Проверка, является ли пользователь админом
  function isAdmin(user) {
    if (!user || !user.email) return false;
    return user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  }
  
  // Функция проверки временного email
  function isDisposableEmail(email) {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return false;
    return disposableEmailDomains.includes(domain);
  }
  
  // Функция генерации кода верификации
  function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  // Функция показа формы верификации
  function showVerifyForm() {
    // Скрываем все формы авторизации, кроме verify-form
    authForms.forEach(f => {
      if (f.id !== 'verify-form') {
        f.classList.remove('active');
      }
    });
    // Показываем форму верификации
    verifyForm.classList.add('active');
    // Скрываем все вкладки
    authTabs.forEach(t => t.classList.remove('active'));
  }
  
  // Функция возврата к форме регистрации
  function showRegisterForm() {
    // Скрываем форму верификации
    verifyForm.classList.remove('active');
    // Скрываем все формы
    authForms.forEach(f => f.classList.remove('active'));
    // Скрываем все вкладки
    authTabs.forEach(t => t.classList.remove('active'));
    // Показываем вкладку регистрации
    document.querySelector('[data-tab="register"]').classList.add('active');
    // Показываем форму регистрации
    registerForm.classList.add('active');
  }
  
  // Счетчик символов для никнейма при регистрации
  if (registerNameInput && nameHint) {
    registerNameInput.addEventListener('input', function() {
      const length = this.value.length;
      nameHint.textContent = length + '/15';
      if (length > 15) {
        nameHint.style.color = '#ff4757';
      } else if (length > 10) {
        nameHint.style.color = '#ffa502';
      } else {
        nameHint.style.color = 'rgba(255,255,255,0.5)';
      }
    });
  }
  
  // Обработчик кнопки отмены верификации
  if (cancelVerifyBtn) {
    cancelVerifyBtn.addEventListener('click', async () => {
      // Удаляем временные данные верификации
      if (pendingVerification && pendingVerification.tempId) {
        try {
          await database.ref('pending_verification/' + pendingVerification.tempId).remove();
        } catch (e) {
          console.log('Очистка отменена');
        }
      }
      pendingVerification = null;
      verificationCode = null;
      showRegisterForm();
    });
  }
  
  // Обработчик повторной отправки кода
  if (resendCodeBtn) {
    resendCodeBtn.addEventListener('click', async () => {
      if (!pendingVerification || !pendingVerification.email) {
        showRegisterForm();
        return;
      }
      
      resendCodeBtn.disabled = true;
      resendCodeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + t('loading', currentLang) + '...';
      
      verificationCode = generateVerificationCode();
      
      try {
        // Обновляем код в БД
        if (pendingVerification.tempId) {
          await database.ref('pending_verification/' + pendingVerification.tempId).update({
            code: verificationCode,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            expires: Date.now() + 15 * 60 * 1000
          });
        }
        
        showToast(t('verifyCodeSent', currentLang) + ' ' + verificationCode, 'info', 10000);
        console.log('Код верификации:', verificationCode);
        
      } catch (error) {
        console.error('Ошибка отправки кода:', error);
        showToast(t('authGenericError', currentLang), 'error');
      }
      
      setTimeout(() => {
        resendCodeBtn.disabled = false;
        resendCodeBtn.innerHTML = '<i class="fas fa-redo"></i> ' + t('verifyResend', currentLang);
      }, 30000);
    });
  }
  
  // Обработчик формы верификации
  if (verifyForm) {
    verifyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const enteredCode = verifyCodeInput.value.trim();
      
      if (!enteredCode || !pendingVerification) {
        verifyError.textContent = t('verifyInvalidCode', currentLang);
        return;
      }
      
      if (enteredCode === verificationCode) {
        try {
          // Создаем пользователя в Firebase Auth после успешной верификации
          const userCredential = await auth.createUserWithEmailAndPassword(pendingVerification.email, pendingVerification.password);
          
          await userCredential.user.updateProfile({
            displayName: pendingVerification.name
          });
          
          // Создаем данные пользователя в БД
          await database.ref('users/' + userCredential.user.uid).set({
            nickname: pendingVerification.name,
            email: pendingVerification.email,
            avatar: DEFAULT_AVATAR,
            background: DEFAULT_BACKGROUND,
            description: '',
            premium: false,
            emailVerified: true,
            createdAt: firebase.database.ServerValue.TIMESTAMP
          });
          
          // Удаляем временные данные верификации
          if (pendingVerification.tempId) {
            await database.ref('pending_verification/' + pendingVerification.tempId).remove();
          }
          
          // Выполняем вход
          await handleAuthSuccess(userCredential.user, 'register');
          
          pendingVerification = null;
          verificationCode = null;
          
        } catch (error) {
          console.error('Ошибка завершения регистрации:', error);
          verifyError.textContent = getAuthErrorMessage(error.code);
        }
      } else {
        verifyError.textContent = t('verifyInvalidCode', currentLang);
        setTimeout(() => verifyError.textContent = '', 5000);
      }
    });
  }

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
        const isBanned = userData.banned === true;
        const banReason = userData.banReason || '';
        const backgroundModal = userData.backgroundModal || DEFAULT_BACKGROUND;
        
        // Устанавливаем фон модального окна (блюр)
        if (backgroundModal.startsWith('http')) {
          modalBackground.style.background = `url('${backgroundModal}')`;
        } else {
          modalBackground.style.background = backgroundModal;
        }
        
        // Проверяем, является ли это профиль текущего пользователя
        const currentUser = auth.currentUser;
        const isOwnProfile = currentUser && currentUser.uid === uid;
        
        // Проверяем, является ли текущий пользователь админом
        const userIsAdmin = isAdmin(currentUser);
        
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
        
        // Определяем класс для никнейма (красный если забанен)
        const nicknameClass = isBanned ? 'modal-name-banned' : 'modal-name';
        
        // Бейджи (премиум и/или бан)
        let badgesHtml = '';
        if (isBanned) {
          badgesHtml += `<span class="modal-ban-badge" title="${t('banReason', currentLang)}: ${banReason}">${BAN_BADGE_ICON}</span>`;
        }
        if (premium) {
          badgesHtml += '<img src="https://liderposm.ru/upload/iblock/ec4/6o0uuv1axgtdzsf9q6c0bti4r2eu6pk6/Galochka.png" class="modal-premium-badge">';
        }
        
        // Кнопки админа (если текущий пользователь - админ)
        let adminButtonsHtml = '';
        if (userIsAdmin && !isOwnProfile) {
          if (isBanned) {
            adminButtonsHtml = `
              <div class="modal-admin-buttons">
                <button class="btn-unban" onclick="unbanUser('${uid}')">${t('unbanUser', currentLang)}</button>
              </div>
            `;
          } else {
            adminButtonsHtml = `
              <div class="modal-admin-buttons">
                <button class="btn-ban" onclick="showBanDialog('${uid}', '${nickname.replace(/'/g, "\\'")}')">${t('banUser', currentLang)}</button>
              </div>
            `;
          }
        }
        
        // Если пользователь забанен, показываем причину
        let banInfoHtml = '';
        if (isBanned && banReason) {
          banInfoHtml = `
            <div class="modal-detail ban-reason">
              <div class="modal-detail-label"><i class="fas fa-gavel"></i> ${t('banReason', currentLang)}</div>
              <div class="modal-detail-value">${banReason}</div>
            </div>
          `;
        }
        
        modalProfile.innerHTML = `
          <img src="${avatar}" class="modal-avatar" alt="Avatar">
          <div class="${nicknameClass}">
            ${nickname}
            ${badgesHtml ? '<div class="badges-container">' + badgesHtml + '</div>' : ''}
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
          ${banInfoHtml}
          ${adminButtonsHtml}
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

  // Форма входа (без проверки emailVerified, т.к. используем кастомную верификацию)
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
          emailVerified: true,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        });
      } else {
        // Обновляем статус верификации в БД
        await database.ref('users/' + userCredential.user.uid + '/emailVerified').set(true);
      }
      
      await handleAuthSuccess(userCredential.user, 'login');
    } catch (error) {
      loginError.textContent = getAuthErrorMessage(error.code);
      setTimeout(() => loginError.textContent = '', 5000);
    }
  });

  // Форма регистрации с кастомной верификацией через код
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim().toLowerCase();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    
    // Валидация никнейма
    if (name.length > 15) {
      registerError.textContent = t('nicknameTooLong', currentLang);
      return;
    }
    
    if (!name) {
      registerError.textContent = t('enterNickname', currentLang);
      return;
    }
    
    // Валидация email
    if (!email || !email.includes('@')) {
      registerError.textContent = t('emailNotValid', currentLang);
      return;
    }
    
    // Проверка на временный email
    if (isDisposableEmail(email)) {
      registerError.textContent = t('disposableEmail', currentLang);
      return;
    }
    
    if (password !== confirmPassword) {
      registerError.textContent = t('passwordsNotMatch', currentLang);
      return;
    }
    
    // Валидация пароля (минимум 6 символов)
    if (password.length < 6) {
      registerError.textContent = t('authWeakPassword', currentLang);
      return;
    }
    
    try {
      // Проверяем, существует ли пользователь с таким никнеймом в БД
      const usersRef = database.ref('users');
      const snapshot = await usersRef.once('value');
      const users = snapshot.val();
      
      if (users) {
        for (const [uid, userData] of Object.entries(users)) {
          if (userData.nickname && userData.nickname.toLowerCase() === name.toLowerCase()) {
            registerError.textContent = t('nicknameExists', currentLang);
            return;
          }
          // Также проверяем email
          if (userData.email && userData.email.toLowerCase() === email) {
            registerError.textContent = t('authEmailInUse', currentLang);
            return;
          }
        }
      }
      
      // Генерируем код верификации
      const verifyCode = generateVerificationCode();
      const tempId = 'temp_' + Date.now();
      
      // Сохраняем данные для верификации во временном узле
      await database.ref('pending_verification/' + tempId).set({
        nickname: name,
        email: email,
        password: password,
        code: verifyCode,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        expires: Date.now() + 15 * 60 * 1000 // 15 минут
      });
      
      // Сохраняем временные данные для использования при подтверждении
      pendingVerification = {
        tempId: tempId,
        email: email,
        password: password,
        name: name
      };
      verificationCode = verifyCode;
      
      // Показываем форму верификации
      showVerifyForm();
      
      // Для демонстрации - показываем код в консоли и уведомлении
      // В реальном приложении код отправляется на email через SMTP
      console.log('Код верификации для', email + ':', verifyCode);
      showToast(t('verifyCodeSent', currentLang) + ' (код: ' + verifyCode + ')', 'info', 15000);
      
    } catch (error) {
      console.error('Ошибка регистрации:', error);
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

  // Счетчик символов для никнейма в настройках
  const settingsNicknameCounter = document.getElementById('settings-nickname-counter');
  if (settingsNickname && settingsNicknameCounter) {
    settingsNickname.addEventListener('input', function() {
      const length = this.value.length;
      settingsNicknameCounter.textContent = length + '/15';
      if (length > 15) {
        settingsNicknameCounter.style.color = '#ff4757';
      } else if (length > 10) {
        settingsNicknameCounter.style.color = '#ffa502';
      } else {
        settingsNicknameCounter.style.color = 'rgba(255,255,255,0.5)';
      }
    });
  }
  
  // Счетчик символов для описания в настройках
  const settingsDescriptionCounter = document.getElementById('settings-description-counter');
  if (settingsDescription && settingsDescriptionCounter) {
    settingsDescription.addEventListener('input', function() {
      const length = this.value.length;
      settingsDescriptionCounter.textContent = length + '/100';
      if (length > 100) {
        settingsDescriptionCounter.style.color = '#ff4757';
      } else if (length > 80) {
        settingsDescriptionCounter.style.color = '#ffa502';
      } else {
        settingsDescriptionCounter.style.color = 'rgba(255,255,255,0.5)';
      }
    });
  }
  
  // Обновление никнейма
  updateSettingsNickname.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    const newNickname = settingsNickname.value.trim();
    if (!newNickname) {
      showToast(t('enterNickname', currentLang), 'warning');
      return;
    }
    
    // Валидация никнейма
    if (newNickname.length > 15) {
      showToast(t('nicknameTooLong', currentLang), 'warning');
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
        const isBanned = user.banned === true;
        const nicknameHtml = isBanned 
          ? `<span style="color: #ff4757; text-shadow: 0 0 10px rgba(255,71,87,0.5);">${user.nickname}</span>`
          : user.nickname;
        
        let badgesHtml = '';
        if (isBanned) {
          badgesHtml += `<span title="${t('banned', currentLang)}" style="filter: drop-shadow(0 0 5px #ff4757);">${BAN_BADGE_ICON}</span>`;
        }
        if (user.premium) {
          badgesHtml += `<img src="https://liderposm.ru/upload/iblock/ec4/6o0uuv1axgtdzsf9q6c0bti4r2eu6pk6/Galochka.png" class="premium-badge">`;
        }
        
        html += `
          <div class="user-card" onclick="openUserProfile('${user.uid}')">
            <img src="${user.avatar || DEFAULT_AVATAR}" class="user-avatar" alt="Avatar" style="${isBanned ? 'border-color: #ff4757;' : ''}">
            <div class="user-info">
              <div class="user-name">
                ${nicknameHtml}
                ${badgesHtml}
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
    
    // Загружаем сообщества при переходе на вкладку
    if (tabId === 'communities') {
      loadCommunities();
    }

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

  // ============ СООБЩЕСТВА (FIRESTORE) ============
  
  // Элементы сообществ
  const communityModal = document.getElementById('community-modal');
  const createCommunityForm = document.getElementById('create-community-form');
  const createCommunityBtn = document.getElementById('create-community-btn');
  const myCommunitiesBtn = document.getElementById('my-communities-btn');
  const allCommunitiesBtn = document.getElementById('all-communities-btn');
  const communitySearchInput = document.getElementById('community-search-input');
  const communitySearchBtn = document.getElementById('community-search-btn');
  const communitiesGrid = document.getElementById('communities-grid');
  const communityError = document.getElementById('community-error');
  
  // Дефолтные значения для сообществ
  const DEFAULT_COMMUNITY_AVATAR = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGFA_-SJuY6WvY2hW4vYTPIwGTgsIvqFPnSA&s';
  const DEFAULT_COMMUNITY_COVER = 'radial-gradient(circle at 20% 30%, #1a1a2e, #16213e, #0f3460)';
  
  // Текущий режим отображения сообществ
  let communitiesViewMode = 'all'; // 'all', 'my'
  
  // Функция открытия модального окна сообщества
  window.openCommunityModal = function() {
    if (!auth.currentUser) {
      showToast(t('loginRequired', currentLang), 'warning');
      return;
    }
    communityModal.classList.add('active');
  };
  
  // Функция закрытия модального окна сообщества
  window.closeCommunityModal = function() {
    communityModal.classList.remove('active');
    createCommunityForm.reset();
    communityError.textContent = '';
  };
  
  // Открытие модального окна создания сообщества
  if (createCommunityBtn) {
    createCommunityBtn.addEventListener('click', openCommunityModal);
  }
  
  // Закрытие по клику вне модального окна
  communityModal.addEventListener('click', (e) => {
    if (e.target === communityModal) {
      closeCommunityModal();
    }
  });
  
  // Создание сообщества в Firestore
  if (createCommunityForm) {
    createCommunityForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const user = auth.currentUser;
      if (!user) {
        communityError.textContent = t('loginRequired', currentLang);
        return;
      }
      
      const name = document.getElementById('community-name').value.trim();
      const description = document.getElementById('community-description').value.trim();
      const avatar = document.getElementById('community-avatar').value.trim() || DEFAULT_COMMUNITY_AVATAR;
      const cover = document.getElementById('community-cover').value.trim() || DEFAULT_COMMUNITY_COVER;
      const category = document.getElementById('community-category').value;
      const type = document.getElementById('community-type').value;
      const tagsStr = document.getElementById('community-tags').value.trim();
      const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(t => t) : [];
      
      if (!name) {
        communityError.textContent = t('communityNameRequired', currentLang);
        return;
      }
      
      if (name.length > 50) {
        communityError.textContent = t('communityNameTooLong', currentLang);
        return;
      }
      
      try {
        // Проверяем уникальность названия в Firestore
        const communitiesSnapshot = await firestore.collection('communities').where('nameLower', '==', name.toLowerCase()).get();
        if (!communitiesSnapshot.empty) {
          communityError.textContent = t('communityNameExists', currentLang);
          return;
        }
        
        // Создаём документ сообщества в Firestore
        const commDocRef = firestore.collection('communities').doc();
        const commId = commDocRef.id;
        const now = firebase.firestore.FieldValue.serverTimestamp();
        
        await commDocRef.set({
          id: commId,
          name: name,
          nameLower: name.toLowerCase(),
          description: description,
          avatar: avatar,
          cover: cover,
          category: category,
          type: type,
          tags: tags,
          ownerId: user.uid,
          ownerName: headerNickname.textContent,
          createdAt: now,
          membersCount: 1,
          postsCount: 0,
          verified: false
        });
        
        // Добавляем владельца в участники
        await firestore.collection('community_members').doc(commId).collection('members').doc(user.uid).set({
          role: 'owner',
          joinedAt: now,
          nickname: headerNickname.textContent
        });
        
        // Добавляем сообщество в список участков пользователя
        await firestore.collection('user_communities').doc(user.uid).collection('communities').doc(commId).set({
          role: 'owner',
          joinedAt: now
        });
        
        closeCommunityModal();
        showToast(t('communityCreated', currentLang), 'success');
        loadCommunities();
        
      } catch (error) {
        console.error('Ошибка создания сообщества:', error);
        communityError.textContent = t('communityCreateError', currentLang);
      }
    });
  }
  
  // Загрузка сообществ из Firestore
  async function loadCommunities() {
    if (!communitiesGrid) return;
    
    communitiesGrid.innerHTML = '<p style="color: rgba(255,255,255,0.7); text-align: center; grid-column: 1/-1;">' + t('loading', currentLang) + '...</p>';
    
    try {
      const user = auth.currentUser;
      let filteredCommunities = [];
      
      if (communitiesViewMode === 'my' && user) {
        // Загружаем сообщества пользователя
        const userCommsSnapshot = await firestore.collection('user_communities').doc(user.uid).collection('communities').get();
        if (!userCommsSnapshot.empty) {
          for (const doc of userCommsSnapshot.docs) {
            const commDoc = await firestore.collection('communities').doc(doc.id).get();
            if (commDoc.exists) {
              filteredCommunities.push({ id: doc.id, ...commDoc.data() });
            }
          }
        }
      } else {
        // Загружаем все публичные сообщества
        const allCommsSnapshot = await firestore.collection('communities').where('type', '==', 'public').get();
        allCommsSnapshot.forEach(doc => {
          filteredCommunities.push({ id: doc.id, ...doc.data() });
        });
        
        // Добавляем сообщества, где пользователь состоит (для непубличных)
        if (user) {
          const userCommsSnapshot = await firestore.collection('user_communities').doc(user.uid).collection('communities').get();
          for (const doc of userCommsSnapshot.docs) {
            const commDoc = await firestore.collection('communities').doc(doc.id).get();
            if (commDoc.exists) {
              const commData = commDoc.data();
              // Проверяем, не добавлено ли уже
              if (!filteredCommunities.find(c => c.id === doc.id)) {
                filteredCommunities.push({ id: doc.id, ...commData });
              }
            }
          }
        }
      }
      
      // Поиск по названию
      const searchTerm = communitySearchInput?.value.trim().toLowerCase();
      if (searchTerm) {
        filteredCommunities = filteredCommunities.filter(comm => 
          comm.name?.toLowerCase().includes(searchTerm) || 
          comm.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }
      
      if (filteredCommunities.length === 0) {
        communitiesGrid.innerHTML = '<p style="color: rgba(255,255,255,0.7); text-align: center; grid-column: 1/-1;">' + t('noCommunitiesFound', currentLang) + '</p>';
        return;
      }
      
      let html = '';
      filteredCommunities.forEach(comm => {
        const typeIcons = {
          'public': '<i class="fas fa-globe"></i>',
          'restricted': '<i class="fas fa-user-lock"></i>',
          'private': '<i class="fas fa-lock"></i>'
        };
        
        const categoryKey = 'category' + comm.category.charAt(0).toUpperCase() + comm.category.slice(1);
        
        html += `
          <div class="user-card" onclick="viewCommunity('${comm.id}')">
            <img src="${comm.avatar || DEFAULT_COMMUNITY_AVATAR}" class="user-avatar" alt="Avatar">
            <div class="user-info">
              <div class="user-name">
                ${comm.name}
                ${comm.verified ? '<i class="fas fa-check-circle" style="color: #2ed573; margin-left: 5px;" title="' + t('verified', currentLang) + '"></i>' : ''}
                ${typeIcons[comm.type] || ''}
              </div>
              <div class="user-description">${comm.description ? comm.description.substring(0, 50) + (comm.description.length > 50 ? '...' : '') : ''}</div>
              <div style="font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-top: 5px;">
                <i class="fas fa-users"></i> ${comm.membersCount || 0} | <i class="fas fa-folder"></i> ${t(categoryKey, currentLang) || comm.category}
              </div>
            </div>
          </div>
        `;
      });
      
      communitiesGrid.innerHTML = html;
      
    } catch (error) {
      console.error('Ошибка загрузки сообществ:', error);
      communitiesGrid.innerHTML = '<p style="color: #ff4757; text-align: center; grid-column: 1/-1;">' + t('communitiesLoadError', currentLang) + '</p>';
    }
  }
  
  // Кнопки переключения режимов
  if (myCommunitiesBtn) {
    myCommunitiesBtn.addEventListener('click', () => {
      communitiesViewMode = 'my';
      myCommunitiesBtn.style.background = 'linear-gradient(135deg, #6e8efb, #a777e3)';
      allCommunitiesBtn.style.background = 'rgba(255,255,255,0.1)';
      loadCommunities();
    });
  }
  
  if (allCommunitiesBtn) {
    allCommunitiesBtn.addEventListener('click', () => {
      communitiesViewMode = 'all';
      allCommunitiesBtn.style.background = 'linear-gradient(135deg, #6e8efb, #a777e3)';
      myCommunitiesBtn.style.background = 'rgba(255,255,255,0.1)';
      loadCommunities();
    });
  }
  
  // Поиск сообществ
  if (communitySearchBtn) {
    communitySearchBtn.addEventListener('click', loadCommunities);
  }
  
  if (communitySearchInput) {
    communitySearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        loadCommunities();
      }
    });
  }
  
  // Функция просмотра сообщества
  window.viewCommunity = async function(commId) {
    const user = auth.currentUser;
    if (!user) {
      showToast(t('loginRequired', currentLang), 'warning');
      return;
    }
    
    // Проверяем, является ли пользователь участником
    const memberDoc = await firestore.collection('community_members').doc(commId).collection('members').doc(user.uid).get();
    const isMember = memberDoc.exists;
    
    if (isMember) {
      openViewCommunityModal(commId);
    } else {
      // Получаем информацию о сообществе
      const commDoc = await firestore.collection('communities').doc(commId).get();
      const comm = commDoc.data();
      
      if (!comm) return;
      
      if (comm.type === 'public') {
        const now = firebase.firestore.FieldValue.serverTimestamp();
        // Автоматически присоединяемся к публичному
        await firestore.collection('community_members').doc(commId).collection('members').doc(user.uid).set({
          role: 'member',
          joinedAt: now,
          nickname: headerNickname.textContent
        });
        
        await firestore.collection('user_communities').doc(user.uid).collection('communities').doc(commId).set({
          role: 'member',
          joinedAt: now
        });
        
        // Увеличиваем счётчик участников
        await firestore.collection('communities').doc(commId).update({
          membersCount: firebase.firestore.FieldValue.increment(1)
        });
        
        showToast(t('joinedCommunity', currentLang), 'success');
        loadCommunities();
        openViewCommunityModal(commId);
      } else if (comm.type === 'restricted') {
        // Для ограниченного - подаём заявку
        await firestore.collection('community_requests').doc(commId).collection('requests').doc(user.uid).set({
          nickname: headerNickname.textContent,
          requestedAt: now,
          status: 'pending'
        });
        
        showToast(t('requestSent', currentLang), 'info');
      } else {
        showToast(t('communityPrivate', currentLang), 'warning');
      }
    }
  };

  // ============ ПОСТЫ В СООБЩЕСТВАХ ============
  
  // Элементы для постов
  let currentViewCommunityId = null;
  let currentViewPostId = null;
  
  // Модальные окна постов
  const viewCommunityModal = document.getElementById('view-community-modal');
  const viewCommunityContent = document.getElementById('view-community-content');
  const postModal = document.getElementById('post-modal');
  const createPostForm = document.getElementById('create-post-form');
  const viewPostModal = document.getElementById('view-post-modal');
  const viewPostContent = document.getElementById('view-post-content');
  const membersModal = document.getElementById('members-modal');
  const membersList = document.getElementById('members-list');
  const inviteModal = document.getElementById('invite-modal');
  const verificationModal = document.getElementById('verification-modal');
  
  // Текущее выбранное сообщество для создания поста
  let selectedCommunityForPost = null;
  
  // Открытие модального окна просмотра сообщества
  window.openViewCommunityModal = function(commId) {
    currentViewCommunityId = commId;
    viewCommunityModal.classList.add('active');
    loadCommunityPosts(commId);
  };
  
  // Закрытие модального окна просмотра сообщества
  window.closeViewCommunityModal = function() {
    viewCommunityModal.classList.remove('active');
    currentViewCommunityId = null;
  };
  
  // Открытие модального окна создания поста
  window.openPostModal = function(commId) {
    const user = auth.currentUser;
    if (!user) {
      showToast(t('loginRequired', currentLang), 'warning');
      return;
    }
    
    selectedCommunityForPost = commId;
    postModal.classList.add('active');
  };
  
  // Закрытие модального окна создания поста
  window.closePostModal = function() {
    postModal.classList.remove('active');
    createPostForm.reset();
    selectedCommunityForPost = null;
    document.getElementById('post-error').textContent = '';
  };
  
  // Открытие модального окна просмотра поста
  window.openViewPostModal = function(postId, commId) {
    currentViewPostId = postId;
    viewPostModal.classList.add('active');
    loadPostWithComments(postId, commId);
  };
  
  // Закрытие модального окна просмотра поста
  window.closeViewPostModal = function() {
    viewPostModal.classList.remove('active');
    currentViewPostId = null;
  };
  
  // Открытие модального окна участников
  window.openMembersModal = function(commId) {
    membersModal.classList.add('active');
    loadCommunityMembers(commId);
  };
  
  // Закрытие модального окна участников
  window.closeMembersModal = function() {
    membersModal.classList.remove('active');
  };
  
  // Открытие модального окна приглашения
  window.openInviteModal = function(commId, commName) {
    document.getElementById('invite-community-name').textContent = commName;
    const inviteLink = window.location.origin + window.location.pathname + '?join=' + commId;
    document.getElementById('invite-link').value = inviteLink;
    inviteModal.classList.add('active');
  };
  
  // Закрытие модального окна приглашения
  window.closeInviteModal = function() {
    inviteModal.classList.remove('active');
    document.getElementById('invite-link-copied').style.display = 'none';
  };
  
  // Открытие модального окна верификации
  window.openVerificationModal = function(commId, commName, isVerified, isOwner) {
    const statusDiv = document.getElementById('verification-status');
    const requestBtn = document.getElementById('request-verification-btn');
    
    if (isVerified) {
      statusDiv.innerHTML = `
        <div style="text-align: center; padding: 15px; background: rgba(46, 213, 115, 0.2); border-radius: 10px;">
          <i class="fas fa-check-circle" style="color: #2ed573; font-size: 2rem; margin-bottom: 10px;"></i>
          <p style="color: #2ed573; font-weight: bold;">${t('communityVerified', currentLang)}</p>
          <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">${t('communityVerifiedDesc', currentLang)}</p>
        </div>
      `;
      requestBtn.style.display = 'none';
    } else if (!isOwner) {
      statusDiv.innerHTML = `
        <div style="text-align: center; padding: 15px; background: rgba(255, 255, 255, 0.1); border-radius: 10px;">
          <i class="fas fa-info-circle" style="color: #ffa502; font-size: 2rem; margin-bottom: 10px;"></i>
          <p style="color: rgba(255,255,255,0.7);">${t('verificationOnlyOwner', currentLang)}</p>
        </div>
      `;
      requestBtn.style.display = 'none';
    } else {
      statusDiv.innerHTML = `
        <div style="text-align: center; padding: 15px; background: rgba(255, 255, 255, 0.1); border-radius: 10px;">
          <i class="fas fa-clock" style="color: #ffa502; font-size: 2rem; margin-bottom: 10px;"></i>
          <p style="color: rgba(255,255,255,0.7);">${t('verificationNotRequested', currentLang)}</p>
        </div>
      `;
      requestBtn.style.display = 'block';
      requestBtn.onclick = function() {
        requestCommunityVerification(commId);
      };
    }
    
    verificationModal.classList.add('active');
  };
  
  // Закрытие модального окна верификации
  window.closeVerificationModal = function() {
    verificationModal.classList.remove('active');
  };
  
// Загрузка постов сообщества из Firestore
  async function loadCommunityPosts(commId) {
    const user = auth.currentUser;

    if (!user) {
      viewCommunityContent.innerHTML = '<p style="color: #ff4757; text-align: center;">Пожалуйста, войдите в систему для просмотра постов</p>';
      return;
    }

    try {
      // Получаем информацию о сообществе из Firestore
      const commDoc = await firestore.collection('communities').doc(commId).get();
      const comm = commDoc.exists ? commDoc.data() : null;

      if (!comm) {
        viewCommunityContent.innerHTML = '<p style="color: #ff4757; text-align: center;">Сообщество не найдено</p>';
        return;
      }

      // Проверяем, является ли пользователь участником
      let isMember = false;
      let isOwner = false;
      let memberRole = null;

      if (user) {
        const memberDoc = await firestore.collection('community_members').doc(commId).collection('members').doc(user.uid).get();
        if (memberDoc.exists) {
          isMember = true;
          const memberData = memberDoc.data();
          memberRole = memberData.role;
          if (memberData.role === 'owner') {
            isOwner = true;
          }
        }
      }

      // Получаем посты из Firestore
      const postsSnapshot = await firestore.collection('community_posts')
        .doc(commId)
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get();

      const posts = [];
      postsSnapshot.forEach(doc => {
        posts.push({ id: doc.id, ...doc.data() });
      });

      // Устанавливаем фон
      const viewCommunityBg = document.getElementById('view-community-bg');
      if (comm.cover && comm.cover.startsWith('http')) {
        viewCommunityBg.style.background = `url('${comm.cover}')`;
      } else {
        viewCommunityBg.style.background = comm.cover || 'linear-gradient(135deg, #1a1a2e, #16213e)';
      }

      // Формируем HTML
      const typeIcons = {
        'public': '<i class="fas fa-globe"></i>',
        'restricted': '<i class="fas fa-user-lock"></i>',
        'private': '<i class="fas fa-lock"></i>'
      };

      const typeLabels = {
        'public': t('typePublic', currentLang),
        'restricted': t('typeRestricted', currentLang),
        'private': t('typePrivate', currentLang)
      };

      let html = `
        <div style="text-align: center; padding: 20px; background: rgba(0,0,0,0.5); border-radius: 15px; margin-bottom: 20px;">
          <img src="${comm.avatar || DEFAULT_COMMUNITY_AVATAR}" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 10px; border: 3px solid rgba(255,255,255,0.3);">
          <h2 style="color: white; margin: 10px 0;">
            ${comm.name}
            ${comm.verified ? '<i class="fas fa-check-circle" style="color: #2ed573; margin-left: 5px;" title="' + t('verified', currentLang) + '"></i>' : ''}
          </h2>
          <p style="color: rgba(255,255,255,0.7);">${comm.description || ''}</p>
          <div style="display: flex; justify-content: center; gap: 15px; margin: 15px 0; flex-wrap: wrap;">
            <span style="color: rgba(255,255,255,0.8);"><i class="fas fa-users"></i> ${comm.membersCount || 0}</span>
            <span style="color: rgba(255,255,255,0.8);"><i class="fas fa-file-alt"></i> ${comm.postsCount || 0} ${t('posts', currentLang)}</span>
            <span style="color: rgba(255,255,255,0.8);">${typeIcons[comm.type] || ''} ${typeLabels[comm.type] || comm.type}</span>
          </div>
          <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-top: 15px;">
            ${isMember ? `
              ${comm.type !== 'public' ? `<button class="auth-btn" style="width: auto; padding: 10px 20px;" onclick="openInviteModal('${commId}', '${comm.name.replace(/'/g, "\\'")}')"><i class="fas fa-link"></i> ${t('invite', currentLang)}</button>` : ''}
              ${isOwner ? `<button class="auth-btn" style="width: auto; padding: 10px 20px;" onclick="openVerificationModal('${commId}', '${comm.name.replace(/'/g, "\\'")}', ${comm.verified || false}, true)"><i class="fas fa-check-circle"></i> ${t('verification', currentLang)}</button>` : ''}
              <button class="auth-btn secondary" style="width: auto; padding: 10px 20px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3);" onclick="openMembersModal('${commId}')"><i class="fas fa-users"></i> ${t('members', currentLang)}</button>
              ${isOwner ? `<button class="auth-btn" style="width: auto; padding: 10px 20px; background: linear-gradient(135deg, #00b894, #00cec9);" onclick="openEditCommunityModal('${commId}')"><i class="fas fa-edit"></i> Редактировать</button>` : ''}
              ${isOwner ? `<button class="auth-btn" style="width: auto; padding: 10px 20px; background: linear-gradient(135deg, #ff4757, #ff6b81);" onclick="deleteCommunity('${commId}', '${comm.name.replace(/'/g, "\\'")}')"><i class="fas fa-trash"></i> ${t('deleteCommunity', currentLang)}</button>` : `
              <button class="auth-btn" style="width: auto; padding: 10px 20px; background: linear-gradient(135deg, #ffa502, #ff7f50);" onclick="leaveCommunity('${commId}')"><i class="fas fa-sign-out-alt"></i> ${t('leaveCommunity', currentLang)}</button>`}
              <button class="auth-btn" style="width: auto; padding: 10px 20px; background: linear-gradient(135deg, #6e8efb, #a777e3);" onclick="openPostModal('${commId}')"><i class="fas fa-pen"></i> ${t('createPost', currentLang)}</button>
            ` : `
              <button class="auth-btn" style="width: auto; padding: 10px 20px;" onclick="joinCommunityFromView('${commId}')"><i class="fas fa-sign-in-alt"></i> ${t('joinCommunity', currentLang)}</button>
            `}
          </div>
        </div>

        <h3 style="color: white; margin-bottom: 15px;"><i class="fas fa-newspaper"></i> ${t('posts', currentLang)}</h3>
      `;

      // Посты
      if (posts.length === 0) {
        html += `<p style="color: rgba(255,255,255,0.5); text-align: center; padding: 20px;">${t('noPosts', currentLang)}</p>`;
      } else {
        posts.forEach(post => {
          let date = '';
          if (post.createdAt && post.createdAt.toDate) {
            date = post.createdAt.toDate().toLocaleDateString('ru-RU');
          } else if (post.createdAt) {
            date = new Date(post.createdAt).toLocaleDateString('ru-RU');
          }
          html += `
            <div class="post-card" onclick="openViewPostModal('${post.id}', '${commId}')">
              ${post.image ? `<img src="${post.image}" class="post-image" alt="Post image" onerror="this.style.display='none'">` : ''}
              <div class="post-content">
                <h4 class="post-title">${post.title || ''}</h4>
                <p class="post-text">${post.content ? post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '') : ''}</p>
                <div class="post-meta">
                  <span><i class="fas fa-user"></i> ${post.authorName || 'Unknown'}</span>
                  <span><i class="fas fa-calendar"></i> ${date}</span>
                  <span><i class="fas fa-comments"></i> ${post.commentsCount || 0}</span>
                </div>
              </div>
            </div>
          `;
        });
      }

      viewCommunityContent.innerHTML = html;

    } catch (error) {
      console.error('Ошибка загрузки постов:', error);
      viewCommunityContent.innerHTML = '<p style="color: #ff4757; text-align: center;">Ошибка загрузки постов. Пожалуйста, обновите страницу или проверьте подключение к интернету.</p>';
    }
  }
  
  // Присоединение к сообществу из просмотра (Firestore)
  window.joinCommunityFromView = async function(commId) {
    const user = auth.currentUser;
    if (!user) {
      showToast(t('loginRequired', currentLang), 'warning');
      return;
    }
    
    try {
      const commDoc = await firestore.collection('communities').doc(commId).get();
      const comm = commDoc.data();
      
      if (!comm) return;
      
      if (comm.type === 'public') {
        const now = firebase.firestore.FieldValue.serverTimestamp();
        
        // Добавляем в участники
        await firestore.collection('community_members').doc(commId).collection('members').doc(user.uid).set({
          role: 'member',
          joinedAt: now,
          nickname: headerNickname.textContent
        });
        
        // Добавляем в список сообществ пользователя
        await firestore.collection('user_communities').doc(user.uid).collection('communities').doc(commId).set({
          role: 'member',
          joinedAt: now
        });
        
        // Увеличиваем счётчик участников
        await firestore.collection('communities').doc(commId).update({
          membersCount: firebase.firestore.FieldValue.increment(1)
        });
        
        showToast(t('joinedCommunity', currentLang), 'success');
        loadCommunityPosts(commId);
      } else if (comm.type === 'restricted') {
        const now = firebase.firestore.FieldValue.serverTimestamp();
        await firestore.collection('community_requests').doc(commId).collection('requests').doc(user.uid).set({
          nickname: headerNickname.textContent,
          requestedAt: now,
          status: 'pending'
        });
        
        showToast(t('requestSent', currentLang), 'info');
      } else {
        showToast(t('communityPrivate', currentLang), 'warning');
      }
    } catch (error) {
      console.error('Ошибка присоединения:', error);
      showToast(t('error', currentLang), 'error');
    }
  };
  
  // Создание поста в Firestore
  if (createPostForm) {
    createPostForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const user = auth.currentUser;
      if (!user) {
        document.getElementById('post-error').textContent = t('loginRequired', currentLang);
        return;
      }
      
      if (!selectedCommunityForPost) {
        document.getElementById('post-error').textContent = t('error', currentLang);
        return;
      }
      
      const title = document.getElementById('post-title').value.trim();
      const content = document.getElementById('post-content').value.trim();
      const image = document.getElementById('post-image').value.trim();
      
      if (!title || !content) {
        document.getElementById('post-error').textContent = t('fillAllFields', currentLang);
        return;
      }
      
      try {
        const now = firebase.firestore.FieldValue.serverTimestamp();
        
        // Создаём пост в Firestore
        const postDocRef = await firestore.collection('community_posts').doc(selectedCommunityForPost).collection('posts').add({
          title: title,
          content: content,
          image: image || null,
          authorId: user.uid,
          authorName: headerNickname.textContent,
          createdAt: now,
          likes: 0,
          commentsCount: 0
        });
        
        // Увеличиваем счётчик постов
        await firestore.collection('communities').doc(selectedCommunityForPost).update({
          postsCount: firebase.firestore.FieldValue.increment(1)
        });
        
        closePostModal();
        showToast(t('postCreated', currentLang), 'success');
        loadCommunityPosts(selectedCommunityForPost);
        
      } catch (error) {
        console.error('Ошибка создания поста:', error);
        document.getElementById('post-error').textContent = t('postCreateError', currentLang);
      }
    });
  }
  
  // Загрузка поста с комментариями из Firestore
  async function loadPostWithComments(postId, commId) {
    try {
      // Получаем текущего пользователя
      const user = window.firebaseAuth?.currentUser;

      // Проверяем, является ли пользователь участником сообщества
      let isMember = false;
      if (user) {
        const memberDoc = await firestore.collection('community_members').doc(commId).collection('members').doc(user.uid).get();
        isMember = memberDoc.exists;
      }

      // Получаем пост из Firestore
      const postDoc = await firestore.collection('community_posts').doc(commId).collection('posts').doc(postId).get();

      // Проверяем, что пост существует и имеет данные
      if (!postDoc.exists) {
        viewPostContent.innerHTML = '<p style="color: #ff4757; text-align: center;">Пост не найден</p>';
        return;
      }

      const post = postDoc.data();
      if (!post) {
        viewPostContent.innerHTML = '<p style="color: #ff4757; text-align: center;">Пост повреждён</p>';
        return;
      }

      // Проверяем минимальную структуру поста
      if (!post.title && !post.content) {
        viewPostContent.innerHTML = '<p style="color: #ff4757; text-align: center;">Пост пустой или повреждён</p>';
        return;
      }

      // Проверяем, что есть хотя бы один из обязательных полей
      if (!post.title && !post.content) {
        viewPostContent.innerHTML = '<p style="color: #ff4757; text-align: center;">Пост не имеет содержимого</p>';
        return;
      }
      
      let date = '';
      if (post.createdAt && post.createdAt.toDate) {
        date = post.createdAt.toDate().toLocaleString('ru-RU');
      } else if (post.createdAt) {
        date = new Date(post.createdAt).toLocaleString('ru-RU');
      }
      
      let html = `
        <div style="background: rgba(255,255,255,0.05); border-radius: 15px; padding: 20px; margin-bottom: 20px;">
          ${post.image ? `<img src="${post.image}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 15px;" alt="Post image" onerror="this.style.display='none'">` : ''}
          <h2 style="color: white; margin-bottom: 10px;">${post.title || ''}</h2>
          <div style="color: rgba(255,255,255,0.7); margin-bottom: 15px;">
            <span><i class="fas fa-user"></i> ${post.authorName || 'Unknown'}</span>
            <span style="margin-left: 15px;"><i class="fas fa-calendar"></i> ${date}</span>
          </div>
          <p style="color: rgba(255,255,255,0.9); line-height: 1.6; white-space: pre-wrap;">${post.content || ''}</p>
          
          <!-- Кнопка удаления поста -->
          ${user && (user.uid === post.authorId || isMember) ? `
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
              ${user.uid === post.authorId || (isMember && isMember.role === 'owner') || (isMember && isMember.role === 'admin') ? `
                <button class="auth-btn" style="width: auto; padding: 8px 15px; background: linear-gradient(135deg, #ff4757, #ff6b81);" onclick="deletePost('${post.id}', '${commId}', '${post.authorId}')">
                  <i class="fas fa-trash"></i> ${t('deletePost', currentLang)}
                </button>
              ` : ''}
            </div>
          ` : ''}
        </div>
        
        <h3 style="color: white; margin-bottom: 15px;"><i class="fas fa-comments"></i> ${t('comments', currentLang)} <span id="comments-count">(${post.commentsCount || 0})</span></h3>
        
        <!-- Форма добавления комментария -->
        <div style="margin-bottom: 20px;">
          <textarea id="comment-text" class="settings-textarea" placeholder="${t('writeComment', currentLang)}" maxlength="1000" style="width: 100%; min-height: 80px; margin-bottom: 10px;"></textarea>
          <button class="auth-btn" style="width: auto; padding: 10px 20px;" onclick="addComment('${commId}', '${postId}')">
            <i class="fas fa-paper-plane"></i> ${t('sendComment', currentLang)}
          </button>
        </div>
        
        <div id="comments-list">
      `;
      
      // Загружаем комментарии из Firestore
      const commentsSnapshot = await firestore.collection('post_comments')
        .doc(commId)
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get();
      
      const comments = [];
      commentsSnapshot.forEach(doc => {
        comments.push({ id: doc.id, ...doc.data() });
      });
      
      if (comments.length === 0) {
        html += `<p style="color: rgba(255,255,255,0.5); text-align: center; padding: 20px;">${t('noComments', currentLang)}</p>`;
      } else {
        comments.forEach(comment => {
          let commentDate = '';
          if (comment.createdAt && comment.createdAt.toDate) {
            commentDate = comment.createdAt.toDate().toLocaleString('ru-RU');
          } else if (comment.createdAt) {
            commentDate = new Date(comment.createdAt).toLocaleString('ru-RU');
          }
          html += `
            <div class="comment-item" style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 15px; margin-bottom: 10px;">
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <img src="${comment.avatar || DEFAULT_AVATAR}" style="width: 35px; height: 35px; border-radius: 50%; margin-right: 10px;">
                <div>
                  <span style="color: white; font-weight: bold;">${comment.authorName || 'Unknown'}</span>
                  <span style="color: rgba(255,255,255,0.5); font-size: 0.8rem; margin-left: 10px;">${commentDate}</span>
                </div>
              </div>
              <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.5;">${comment.text || ''}</p>
            </div>
          `;
        });
      }
      
      html += '</div>';
      viewPostContent.innerHTML = html;
      
    } catch (error) {
      console.error('Ошибка загрузки поста:', error);
      viewPostContent.innerHTML = '<p style="color: #ff4757; text-align: center;">Ошибка загрузки поста</p>';
    }
  }
  
  // Добавление комментария в Firestore
  window.addComment = async function(commId, postId) {
    const user = auth.currentUser;
    if (!user) {
      showToast(t('loginRequired', currentLang), 'warning');
      return;
    }
    
    const commentText = document.getElementById('comment-text').value.trim();
    if (!commentText) {
      showToast(t('enterComment', currentLang), 'warning');
      return;
    }
    
    try {
      const now = firebase.firestore.FieldValue.serverTimestamp();
      
      // Получаем аватар пользователя
      const userSnapshot = await database.ref('users/' + user.uid).once('value');
      const userData = userSnapshot.val();
      
      // Создаём комментарий в Firestore
      await firestore.collection('post_comments').doc(commId).collection('posts').doc(postId).collection('comments').add({
        text: commentText,
        authorId: user.uid,
        authorName: headerNickname.textContent,
        avatar: userData?.avatar || DEFAULT_AVATAR,
        createdAt: now
      });
      
      // Увеличиваем счётчик комментариев в посте
      const postRef = firestore.collection('community_posts').doc(commId).collection('posts').doc(postId);
      await postRef.update({
        commentsCount: firebase.firestore.FieldValue.increment(1)
      });
      
      // Обновляем комментарии
      loadPostWithComments(postId, commId);
      
    } catch (error) {
      console.error('Ошибка добавления комментария:', error);
      showToast(t('commentError', currentLang), 'error');
    }
  };
  
  // Загрузка участников сообщества из Firestore
  async function loadCommunityMembers(commId) {
    try {
      const membersSnapshot = await firestore.collection('community_members').doc(commId).collection('members').get();
      
      if (membersSnapshot.empty) {
        membersList.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center;">' + t('noMembers', currentLang) + '</p>';
        return;
      }
      
      const membersArray = membersSnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
      membersArray.sort((a, b) => {
        const roleOrder = { 'owner': 0, 'admin': 1, 'moderator': 2, 'member': 3 };
        return (roleOrder[a.role] || 4) - (roleOrder[b.role] || 4);
      });
      
      // Получаем данные пользователей из Realtime Database для аватарок
      let membersHtml = '';
      
      for (const member of membersArray) {
        const roleIcons = {
          'owner': '<i class="fas fa-crown" style="color: #ffa502;"></i>',
          'admin': '<i class="fas fa-shield-alt" style="color: #2ed573;"></i>',
          'moderator': '<i class="fas fa-star" style="color: #3742fa;"></i>',
          'member': '<i class="fas fa-user" style="color: rgba(255,255,255,0.5);"></i>'
        };
        
        const roleLabels = {
          'owner': t('roleOwner', currentLang),
          'admin': t('roleAdmin', currentLang),
          'moderator': t('roleModerator', currentLang),
          'member': t('roleMember', currentLang)
        };
        
        // Правильно обрабатываем дату из Firestore
        let joinDate = '';
        if (member.joinedAt) {
          if (member.joinedAt.toDate && typeof member.joinedAt.toDate === 'function') {
            joinDate = member.joinedAt.toDate().toLocaleDateString('ru-RU');
          } else if (member.joinedAt instanceof Date) {
            joinDate = member.joinedAt.toLocaleDateString('ru-RU');
          } else if (typeof member.joinedAt === 'number') {
            joinDate = new Date(member.joinedAt).toLocaleDateString('ru-RU');
          } else if (typeof member.joinedAt === 'string') {
            joinDate = new Date(member.joinedAt).toLocaleDateString('ru-RU');
          }
        }
        
        // Получаем аватарку пользователя из базы данных
        let memberAvatar = DEFAULT_AVATAR;
        try {
          const userSnapshot = await database.ref('users/' + member.uid).once('value');
          const userData = userSnapshot.val();
          if (userData && userData.avatar) {
            memberAvatar = userData.avatar;
          }
        } catch (e) {
          console.log('Не удалось получить аватар для:', member.uid);
        }
        
        membersHtml += `
          <div class="member-item" onclick="openUserProfile('${member.uid}')" style="display: flex; align-items: center; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 10px; margin-bottom: 10px; cursor: pointer; transition: background 0.2s;">
            <img src="${memberAvatar}" style="width: 45px; height: 45px; border-radius: 50%; margin-right: 12px; object-fit: cover;">
            <div style="flex: 1;">
              <div style="color: white; font-weight: bold;">
                ${member.nickname || 'Unknown'}
                ${roleIcons[member.role] || roleIcons.member}
              </div>
              <div style="color: rgba(255,255,255,0.5); font-size: 0.8rem;">
                ${roleLabels[member.role] || t('roleMember', currentLang)} • ${t('joined', currentLang)} ${joinDate}
              </div>
            </div>
            <i class="fas fa-chevron-right" style="color: rgba(255,255,255,0.3);"></i>
          </div>
        `;
      }
      
      membersList.innerHTML = membersHtml;
      
    } catch (error) {
      console.error('Ошибка загрузки участников:', error);
      membersList.innerHTML = '<p style="color: #ff4757; text-align: center;">Ошибка загрузки</p>';
    }
  }
  
  // Запрос верификации сообщества через Google Forms
  async function requestCommunityVerification(commId) {
    const user = auth.currentUser;
    if (!user) {
      showToast(t('loginRequired', currentLang), 'warning');
      return;
    }
    
    try {
      // Открываем Google Forms в новой вкладке
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSdlGHpX6ocdh0rZ17VMuuOG-8DX9qmLXx4659LWNtdBW0YEdA/viewform', '_blank');
      
      // Также сохраняем запрос в БД
      await database.ref('community_verifications/' + commId).set({
        communityId: commId,
        requestedBy: user.uid,
        requestedAt: firebase.database.ServerValue.TIMESTAMP,
        status: 'pending'
      });
      
      showToast(t('verificationRequested', currentLang), 'success');
      closeVerificationModal();
      
    } catch (error) {
      console.error('Ошибка запроса верификации:', error);
      showToast(t('error', currentLang), 'error');
    }
  }
  
  // Обработчик копирования ссылки приглашения
  const copyInviteLinkBtn = document.getElementById('copy-invite-link');
  if (copyInviteLinkBtn) {
    copyInviteLinkBtn.addEventListener('click', () => {
      const inviteLink = document.getElementById('invite-link');
      navigator.clipboard.writeText(inviteLink.value).then(() => {
        document.getElementById('invite-link-copied').style.display = 'block';
        setTimeout(() => {
          document.getElementById('invite-link-copied').style.display = 'none';
        }, 2000);
      });
    });
  }
  
  // Закрытие модальных окон по клику вне
  viewCommunityModal.addEventListener('click', (e) => {
    if (e.target === viewCommunityModal) {
      closeViewCommunityModal();
    }
  });
  
  postModal.addEventListener('click', (e) => {
    if (e.target === postModal) {
      closePostModal();
    }
  });
  
  viewPostModal.addEventListener('click', (e) => {
    if (e.target === viewPostModal) {
      closeViewPostModal();
    }
  });
  
  membersModal.addEventListener('click', (e) => {
    if (e.target === membersModal) {
      closeMembersModal();
    }
  });
  
  inviteModal.addEventListener('click', (e) => {
    if (e.target === inviteModal) {
      closeInviteModal();
    }
  });
  
  verificationModal.addEventListener('click', (e) => {
    if (e.target === verificationModal) {
      closeVerificationModal();
    }
  });
  
  
  // Обработка ссылки приглашения при загрузке страницы
  function handleInviteLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const joinCode = urlParams.get('join');
    
    if (joinCode) {
      // Удаляем параметр из URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Проверяем, авторизован ли пользователь
      const user = auth.currentUser;
      if (user) {
        // Получаем информацию о сообществе и обрабатываем присоединение
        processCommunityJoin(joinCode);
      } else {
        // Показываем уведомление после входа
        sessionStorage.setItem('pendingJoin', joinCode);
      }
    }
  }
  
  // Обработка присоединения к сообществу по коду
  async function processCommunityJoin(commId) {
    const user = auth.currentUser;
    if (!user) {
      showToast(t('loginRequired', currentLang), 'warning');
      return;
    }
    
    try {
      const commDoc = await firestore.collection('communities').doc(commId).get();
      const comm = commDoc.data();
      
      if (!comm) {
        showToast(t('communityNotFound', currentLang), 'error');
        return;
      }
      
      // Проверяем, является ли пользователь уже участником
      const memberDoc = await firestore.collection('community_members').doc(commId).collection('members').doc(user.uid).get();
      
      if (memberDoc.exists) {
        // Уже участник - открываем сообщество
        openViewCommunityModal(commId);
        return;
      }
      
      const now = firebase.firestore.FieldValue.serverTimestamp();
      
      if (comm.type === 'public') {
        // Автоматически присоединяемся к публичному
        await firestore.collection('community_members').doc(commId).collection('members').doc(user.uid).set({
          role: 'member',
          joinedAt: now,
          nickname: headerNickname.textContent
        });
        
        await firestore.collection('user_communities').doc(user.uid).collection('communities').doc(commId).set({
          role: 'member',
          joinedAt: now
        });
        
        // Увеличиваем счётчик участников
        await firestore.collection('communities').doc(commId).update({
          membersCount: firebase.firestore.FieldValue.increment(1)
        });
        
        showToast(t('joinedCommunity', currentLang), 'success');
        openViewCommunityModal(commId);
      } else if (comm.type === 'restricted') {
        // Для ограниченного - подаём заявку
        await firestore.collection('community_requests').doc(commId).collection('requests').doc(user.uid).set({
          nickname: headerNickname.textContent,
          requestedAt: now,
          status: 'pending'
        });
        
        showToast(t('requestSent', currentLang), 'info');
        // Всё равно показываем сообщество
        loadCommunityPosts(commId);
        openViewCommunityModal(commId);
      } else {
        // Закрытое сообщество — показываем просмотр и кнопку "Запросить доступ"
        loadCommunityPosts(commId);
        openViewCommunityModal(commId);
      }
    } catch (error) {
      console.error('Ошибка присоединения по ссылке:', error);
      showToast(t('error', currentLang), 'error');
    }
  }
  
  // Функция присоединения к сообществу из просмотра (открытая)
  window.joinCommunityFromView = async function(commId) {
    await processCommunityJoin(commId);
  };
  
  // Обработка ожидающего приглашения после входа
  auth.onAuthStateChanged((user) => {
    if (user) {
      const pendingJoin = sessionStorage.getItem('pendingJoin');
      if (pendingJoin) {
        sessionStorage.removeItem('pendingJoin');
        setTimeout(() => {
          viewCommunity(pendingJoin);
        }, 1000);
      }
    }
  });
  
  // Вызываем обработку при загрузке
  handleInviteLink();

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
  
  // Экспорт переменных в глобальную область для использования внешними функциями
  window.firebaseAuth = auth;
  window.firebaseDatabase = database;
  window.firebaseFirestore = firestore;
  window.firebase = firebase;
  window.isAdminGlobal = isAdmin;
  window.showToastGlobal = showToast;
  window.closeModalGlobal = closeModal;
  window.tGlobal = t;
  window.currentLangGlobal = currentLang;
  window.headerNicknameGlobal = headerNickname;
  window.firestoreGlobal = firestore;
  window.loadCommunitiesGlobal = loadCommunities;
  window.loadCommunityPostsGlobal = loadCommunityPosts;
})();

/**
 * Модальное окно редактирования сообщества
 */
window.openEditCommunityModal = async function(commId) {
  const auth = window.firebaseAuth;
  const firestore = window.firebaseFirestore;
  const showToast = window.showToastGlobal;
  const t = window.tGlobal;
  const currentLang = window.currentLangGlobal;

  const user = auth?.currentUser;
  if (!user) return;

  // Получаем данные сообщества
  const commDoc = await firestore.collection('communities').doc(commId).get();
  const comm = commDoc.data();
  if (!comm) {
    showToast('Сообщество не найдено', 'error');
    return;
  }
  if (comm.ownerId !== user.uid) {
    showToast('Только владелец может редактировать', 'error');
    return;
  }

  // Создаем простое модальное окно (можно доработать стилизацию)
  let modal = document.getElementById('edit-community-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'edit-community-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.7)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    modal.innerHTML = `
      <div style="background: #222; padding: 30px 25px; border-radius: 16px; min-width: 320px; max-width: 95vw; box-shadow: 0 8px 32px rgba(0,0,0,0.3); position: relative;">
        <button id="close-edit-community-modal" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;"><i class="fas fa-times"></i></button>
        <h2 style="color: #fff; margin-bottom: 20px;">Редактировать сообщество</h2>
        <form id="edit-community-form">
          <div style="margin-bottom: 15px;">
            <label style="color: #fff;">Название</label>
            <input type="text" id="edit-community-name" value="${comm.name}" maxlength="50" style="width: 100%; padding: 8px; border-radius: 6px; border: none; margin-top: 5px;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="color: #fff;">Аватар (URL)</label>
            <input type="text" id="edit-community-avatar" value="${comm.avatar || ''}" style="width: 100%; padding: 8px; border-radius: 6px; border: none; margin-top: 5px;">
          </div>
          <div id="edit-community-error" style="color: #ff4757; margin-bottom: 10px;"></div>
          <button type="submit" style="background: linear-gradient(135deg, #00b894, #00cec9); color: #fff; border: none; border-radius: 6px; padding: 10px 25px; font-size: 1rem; cursor: pointer;">Сохранить</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    modal.style.display = 'flex';
    document.getElementById('edit-community-name').value = comm.name;
    document.getElementById('edit-community-avatar').value = comm.avatar || '';
    document.getElementById('edit-community-error').textContent = '';
  }

  // Закрытие модалки
  document.getElementById('close-edit-community-modal').onclick = () => {
    modal.style.display = 'none';
  };

  // Сохранение изменений
  document.getElementById('edit-community-form').onsubmit = async function(e) {
    e.preventDefault();
    const name = document.getElementById('edit-community-name').value.trim();
    const avatar = document.getElementById('edit-community-avatar').value.trim();
    const errorDiv = document.getElementById('edit-community-error');
    errorDiv.textContent = '';

    if (!name) {
      errorDiv.textContent = 'Название обязательно';
      return;
    }
    if (name.length > 50) {
      errorDiv.textContent = 'Название слишком длинное';
      return;
    }

    try {
      await firestore.collection('communities').doc(commId).update({
        name: name,
        avatar: avatar
      });
      showToast('Сообщество обновлено', 'success');
      modal.style.display = 'none';
      if (typeof window.loadCommunityPostsGlobal === 'function') {
        window.loadCommunityPostsGlobal(commId);
      }
      if (typeof window.loadCommunitiesGlobal === 'function') {
        window.loadCommunitiesGlobal();
      }
    } catch (err) {
      errorDiv.textContent = 'Ошибка сохранения';
    }
  };
};

/*
// Глобальные функции для админа
*/
window.banUser = async function(uid, reason) {
  const auth = window.firebaseAuth;
  const database = window.firebaseDatabase;
  const firebase = window.firebase;
  const user = auth?.currentUser;
  const isAdmin = window.isAdminGlobal;
  const showToast = window.showToastGlobal;
  const closeModal = window.closeModalGlobal;
  const t = window.tGlobal;
  const currentLang = window.currentLangGlobal;
  
  if (!user || !isAdmin?.(user)) return;
  
  try {
    await database.ref('users/' + uid).update({
      banned: true,
      banReason: reason,
      bannedAt: firebase.database.ServerValue.TIMESTAMP,
      bannedBy: user.uid
    });
    
    showToast(t('userBanned', currentLang), 'success');
    closeModal();
  } catch (error) {
    console.error('Ошибка бана:', error);
    showToast(t('banError', currentLang), 'error');
  }
};

window.unbanUser = async function(uid) {
  const auth = window.firebaseAuth;
  const database = window.firebaseDatabase;
  const firebase = window.firebase;
  const user = auth?.currentUser;
  const isAdmin = window.isAdminGlobal;
  const showToast = window.showToastGlobal;
  const closeModal = window.closeModalGlobal;
  const t = window.tGlobal;
  const currentLang = window.currentLangGlobal;
  
  if (!user || !isAdmin?.(user)) return;
  
  try {
    await database.ref('users/' + uid).update({
      banned: null,
      banReason: null,
      bannedAt: null,
      bannedBy: null
    });
    
    showToast(t('userUnbanned', currentLang), 'success');
    closeModal();
  } catch (error) {
    console.error('Ошибка разбана:', error);
    showToast(t('unbanError', currentLang), 'error');
  }
};

window.showBanDialog = function(uid, nickname) {
  const t = window.tGlobal;
  const currentLang = window.currentLangGlobal;
  const reason = prompt(t('enterBanReason', currentLang));
  if (reason !== null && reason.trim() !== '') {
    window.banUser(uid, reason.trim());
  }
};

// ============ НОВЫЕ ФУНКЦИИ ДЛЯ СООБЩЕСТВ И ПОСТОВ ============

// Удаление сообщества (только для владельца)
window.deleteCommunity = async function(commId, commName) {
  const auth = window.firebaseAuth;
  const firestore = window.firebaseFirestore;
  const firebase = window.firebase;
  const showToast = window.showToastGlobal;
  const t = window.tGlobal;
  const currentLang = window.currentLangGlobal;
  
  // Показываем подтверждение
  const confirmed = confirm(t('confirmDeleteCommunity', currentLang) || 'Вы уверены, что хотите удалить сообщество "' + commName + '"? Все посты и участники будут удалены.');
  
  if (!confirmed) return;
  
  const user = auth?.currentUser;
  if (!user) {
    showToast(t('loginRequired', currentLang), 'warning');
    return;
  }
  
  try {
    // Получаем данные сообщества
    const commDoc = await firestore.collection('communities').doc(commId).get();
    const commData = commDoc.data();
    
    // Проверяем, является ли пользователь владельцем
    if (commData && commData.ownerId !== user.uid) {
      showToast(t('onlyOwnerCanDelete', currentLang) || 'Только владелец может удалить сообщество', 'error');
      return;
    }
    
    // Удаляем все посты сообщества
    const postsSnapshot = await firestore.collection('community_posts').doc(commId).collection('posts').get();
    const deletePostPromises = postsSnapshot.docs.map(postDoc => 
      firestore.collection('community_posts').doc(commId).collection('posts').doc(postDoc.id).delete()
    );
    await Promise.all(deletePostPromises);
    
    // Удаляем коллекцию постов
    await firestore.collection('community_posts').doc(commId).delete();
    
    // Удаляем всех участников
    const membersSnapshot = await firestore.collection('community_members').doc(commId).collection('members').get();
    const deleteMemberPromises = membersSnapshot.docs.map(memberDoc =>
      firestore.collection('community_members').doc(commId).collection('members').doc(memberDoc.id).delete()
    );
    await Promise.all(deleteMemberPromises);
    
    // Удаляем коллекцию участников
    await firestore.collection('community_members').doc(commId).delete();
    
    // Удаляем сообщество из списков пользователей
    // (это нужно делать отдельно для каждого пользователя - можно оставить как есть)
    
    // Удаляем само сообщество
    await firestore.collection('communities').doc(commId).delete();
    
    showToast(t('communityDeleted', currentLang) || 'Сообщество удалено', 'success');
    
    // Закрываем модалку и обновляем список
    if (typeof window.closeViewCommunityModal === 'function') {
      window.closeViewCommunityModal();
    }
    if (typeof window.loadCommunities === 'function') {
      window.loadCommunities();
    }
    
  } catch (error) {
    console.error('Ошибка удаления сообщества:', error);
    showToast(t('error', currentLang), 'error');
  }
};

// Удаление поста
window.deletePost = async function(postId, commId, authorId) {
  const auth = window.firebaseAuth;
  const firestore = window.firebaseFirestore;
  const firebase = window.firebase;
  const showToast = window.showToastGlobal;
  const t = window.tGlobal;
  const currentLang = window.currentLangGlobal;
  
  const user = auth?.currentUser;
  if (!user) {
    showToast(t('loginRequired', currentLang), 'warning');
    return;
  }
  
  try {
    // Получаем данные поста
    const postDoc = await firestore.collection('community_posts').doc(commId).collection('posts').doc(postId).get();
    const postData = postDoc.data();
    
    if (!postData) {
      showToast(t('postNotFound', currentLang) || 'Пост не найден', 'error');
      return;
    }
    
    // Проверяем, является ли пользователь автором поста или владельцем/админом сообщества
    const isAuthor = postData.authorId === user.uid;
    
    // Проверяем роль пользователя в сообществе
    let memberDoc = await firestore.collection('community_members').doc(commId).collection('members').doc(user.uid).get();
    let isAdmin = false;
    if (memberDoc.exists) {
      const memberData = memberDoc.data();
      if (memberData.role === 'owner' || memberData.role === 'admin') {
        isAdmin = true;
      }
    }
    
    if (!isAuthor && !isAdmin) {
      showToast(t('cantDeletePost', currentLang) || 'Вы не можете удалить этот пост', 'error');
      return;
    }
    
    // Подтверждение удаления
    const confirmed = confirm(t('confirmDeletePost', currentLang) || 'Вы уверены, что хотите удалить этот пост?');
    
    if (!confirmed) return;
    
    // Удаляем все комментарии поста
    const commentsSnapshot = await firestore.collection('post_comments')
      .doc(commId)
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .get();
    
    const deleteCommentPromises = commentsSnapshot.docs.map(commentDoc =>
      firestore.collection('post_comments')
        .doc(commId)
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .doc(commentDoc.id)
        .delete()
    );
    await Promise.all(deleteCommentPromises);
    
    // Удаляем коллекцию комментариев поста
    await firestore.collection('post_comments').doc(commId).collection('posts').doc(postId).delete();
    
    // Удаляем сам пост
    await firestore.collection('community_posts').doc(commId).collection('posts').doc(postId).delete();
    
    // Уменьшаем счётчик постов
    await firestore.collection('communities').doc(commId).update({
      postsCount: firebase.firestore.FieldValue.increment(-1)
    });
    
    showToast(t('postDeleted', currentLang) || 'Пост удалён', 'success');
    
    // Закрываем модалку поста и обновляем посты
    if (typeof window.closeViewPostModal === 'function') {
      window.closeViewPostModal();
    }
    if (typeof window.loadCommunityPosts === 'function') {
      window.loadCommunityPosts(commId);
    }
    
  } catch (error) {
    console.error('Ошибка удаления поста:', error);
    showToast(t('error', currentLang), 'error');
  }
};

// Выход из сообщества
window.leaveCommunity = async function(commId) {
  const auth = window.firebaseAuth;
  const firestore = window.firebaseFirestore;
  const firebase = window.firebase;
  const showToast = window.showToastGlobal;
  const t = window.tGlobal;
  const currentLang = window.currentLangGlobal;
  
  const user = auth?.currentUser;
  if (!user) {
    showToast(t('loginRequired', currentLang), 'warning');
    return;
  }
  
  try {
    // Проверяем, является ли пользователь владельцем
    const commDoc = await firestore.collection('communities').doc(commId).get();
    const commData = commDoc.data();
    
    if (commData && commData.ownerId === user.uid) {
      showToast(t('ownerCantLeave', currentLang) || 'Владелец не может выйти из сообщества. Удалите сообщество вместо этого.', 'warning');
      return;
    }
    
    // Подтверждение
    const confirmed = confirm(t('confirmLeaveCommunity', currentLang) || 'Вы уверены, что хотите выйти из сообщества?');
    
    if (!confirmed) return;
    
    // Удаляем из участников
    await firestore.collection('community_members').doc(commId).collection('members').doc(user.uid).delete();
    
    // Удаляем из списка сообществ пользователя
    await firestore.collection('user_communities').doc(user.uid).collection('communities').doc(commId).delete();
    
    // Уменьшаем счётчик участников
    await firestore.collection('communities').doc(commId).update({
      membersCount: firebase.firestore.FieldValue.increment(-1)
    });
    
    showToast(t('leftCommunity', currentLang) || 'Вы вышли из сообщества', 'success');
    
    // Закрываем модалку
    if (typeof window.closeViewCommunityModal === 'function') {
      window.closeViewCommunityModal();
    }
    
  } catch (error) {
    console.error('Ошибка выхода из сообщества:', error);
    showToast(t('error', currentLang), 'error');
  }
};
