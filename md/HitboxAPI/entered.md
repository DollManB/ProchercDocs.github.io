# Hitbox API

Hitbox API предоставляет инструменты для работы с физическими границами объектов в игре. Этот API позволяет определять, проверять и модифицировать hitbox'ы (зоны попадания) сущностей, блоков и других игровых объектов.

## Основные возможности

### 1. Определение hitbox'ов
```javascript
// Получение hitbox'a сущности
const entityHitbox = HitboxAPI.getEntityHitbox(entityId);

// Получение hitbox'a блока
const blockHitbox = HitboxAPI.getBlockHitbox(x, y, z);
```

### 2. Проверка пересечений
```javascript
// Проверка пересечения двух hitbox'ов
const isColliding = HitboxAPI.checkCollision(hitbox1, hitbox2);

// Проверка попадания точки в hitbox
const isPointInside = HitboxAPI.isPointInHitbox(hitbox, x, y, z);
```

### 3. Модификация hitbox'ов
```javascript
// Изменение размера hitbox'a
HitboxAPI.resizeHitbox(entityId, width, height, depth);

// Смещение hitbox'a
HitboxAPI.offsetHitbox(entityId, xOffset, yOffset, zOffset);
```

## Примеры использования

### Проверка попадания по игроку
```javascript
// Получаем hitbox игрока
const playerHitbox = HitboxAPI.getEntityHitbox(player.getId());

// Проверяем, попадает ли координата выстрела в игрока
const isHit = HitboxAPI.isPointInHitbox(playerHitbox, bulletX, bulletY, bulletZ);

if (isHit) {
    player.damage(10);
}
```

### Создание кастомных зон взаимодействия
```javascript
// Создаем невидимую зону для триггера
const triggerZone = HitboxAPI.createCustomHitbox(
    x, y, z, width, height, depth
);

// Проверяем, вошел ли игрок в зону
if (HitboxAPI.checkCollision(triggerZone, playerHitbox)) {
    triggerEvent();
}
```

## Лучшие практики

1. **Кэширование**: Кэшируйте hitbox'ы сущностей для оптимизации производительности
2. **Частота проверок**: Не выполняйте проверки пересечений каждый тик - используйте разумные интервалы
3. **Визуализация**: В режиме отладки используйте `HitboxAPI.debugRender()` для визуализации hitbox'ов

## Ограничения

- Не все сущности имеют модифицируемые hitbox'ы
- Изменения hitbox'ов могут не синхронизироваться в мультиплеере
- Слишком большие hitbox'ы могут вызывать проблемы с производительностью