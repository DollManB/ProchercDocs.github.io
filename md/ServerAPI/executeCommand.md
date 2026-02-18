# Выполнить команду

Этот метод позволяет от имени сервера выполнить команду

example:
```js
Server.executeCommand("example command"); // необязательно писать через [ / ]
```

пример:
```js
Server.executeCommand("time set day");
```

еще пример:
```js
let plr = Server.getRandomPlayer();
let name = plr.getName();

Server.executeCommand("give " + name + " minecraft:stick");
```