# ServerPlayerEntity

Компонент игрока зависящий от <span style={{color: '#fce565'}}>net.minecraft.server.network</span>, полную информацию посмотреть по нему можно [тут](https://maven.fabricmc.net/docs/yarn-1.20.1+build.1/net/minecraft/server/network/ServerPlayerEntity.html)

чтобы его получить нужно просто прописать

```js
let player = Player.getServerPlayer(); //возвращает ServerPlayerEntity в player
```

от ServerPlayerEntity мы уже можем получить например рандомный предмет

```js
var Random = java.util.Random;
var Registries = net.minecraft.registry.Registries;
var ItemStack = net.minecraft.item.ItemStack;
var Text = net.minecraft.text.Text;

function giveRandomItem(player) {
    var itemRegistry = Registries.ITEM;
    var allItems = itemRegistry.stream().toList();
    
    var rand = new Random();
    var randomIndex = rand.nextInt(allItems.size());
    
    var randomItem = allItems.get(randomIndex);
    var itemStack = new ItemStack(randomItem, 1);
    
    player.getInventory().insertStack(itemStack);
    
    var itemName = randomItem.getName().getString();
    player.sendMessage(Text.literal("§a[Engine] §fВы получили рандомный предмет: §e" + itemName), false);
}

if (typeof Player !== 'undefined') {
    giveRandomItem(Player.getServerPlayer());
}
```

или же заспавнить рандомную сущность:

```js
var Registries = net.minecraft.registry.Registries;
var BlockPos = net.minecraft.util.math.BlockPos;
var Random = java.util.Random;

function spawnRandomEntity(player) {
    var world = player.getEntityWorld();
    var pos = player.getPos();

    var entityRegistry = Registries.ENTITY_TYPE;
    var allEntityTypes = entityRegistry.stream().toList();

    var rand = new Random();
    var randomType = allEntityTypes.get(rand.nextInt(allEntityTypes.size()));
    var entity = randomType.create(world);

    if (entity != null) {
        entity.refreshPositionAndAngles(pos.x, pos.y, pos.z, player.getYaw(), 0);
        world.spawnEntity(entity);

        var entityName = randomType.getName().getString();
        player.sendMessage(net.minecraft.text.Text.literal("§6[Engine] §fЗаспавнен: §e" + entityName), false);
    }
}
if (typeof Player !== 'undefined') {
    spawnRandomEntity(Player.getServerPlayer());
}
```