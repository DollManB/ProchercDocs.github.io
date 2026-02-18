# Как тебя звать путник?

тут мы поговорим про метод у [<span style={{color: '#00ffd5'}}>Player</span>](../PlayerAPI/entered)

Который поможет взять название имени у игрока

он называется <span style={{color: '#fff45b'}}>getName()</span> - получает имя игрока

example:
```js
let name = Player.getName();
```

а так же вывести его через [чат](../PlayerAPI/sendMessage)

пример:
```js
let name = Player.getName();
Player.sendMessage(name);
```