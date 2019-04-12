var config = {
    type: Phaser.AUTO,
    backgroundColor: '#424242',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.BOTH,
        width: 1024,
        height: 896,
        max: {
            width: 1024,
            height: 896
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload()
{
    // Load images.
    this.load.image('player', 'assets/sprites/character_plain.png');
    this.load.image('cave_wall', 'assets/sprites/cave_wall.png');
    this.load.image('cave_floor', 'assets/sprites/cave_floor.png');

    // Load data.
    this.load.json('config', 'data/config.json');
    this.load.json('cave', 'data/generation/cave.json');
    this.load.json('tiles', 'data/objects/tiles.json');
}


function create()
{
    gameData = {
        config: this.cache.json.get('config'),
        generation: {
            cave: this.cache.json.get('cave')
        },
        tiles: this.cache.json.get('tiles'),
        map: [[]]
    }

    player = new Player('Player', 32, 32, null, null, {"fore": '#ffffff', "back": '#ffffff'});
    player.init(this);
    let spawn = [];

    objects = [];
    gameData.map, spawn = generateCave(this, gameData.map, gameData.generation.cave, gameData.tiles, 
                                       gameData.generation.cave.maxWidth, gameData.generation.cave.maxHeight, 
                                       gameData.config.tile.width, gameData.config.tile.height);
    
    player.x = spawn[0];
    player.y = spawn[1];

    // Create event listeners.
    this.input.on('gameobjectdown', function(mouse, obj){return onClick(mouse, obj)}, this);
}


function onClick(mouse, obj)
{
    if(obj.parent.walkable){
        player.x = obj.x;
        player.y = obj.y;
    }
}


function update()
{
    
    for(let x = 0; x < gameData.generation.cave.maxWidth; x++) {
        for(let y = 0; y < gameData.generation.cave.maxHeight; y++) {
            if(gameData.map[x][y]){
                gameData.map[x][y].draw(true);
            }
        }
    }
    
    player.draw(true);

}