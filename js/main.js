var config = {
    type: Phaser.AUTO,
    backgroundColor: '#424242',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.BOTH,
        //width: 256,
        //height: 256,
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
    this.load.image('cave_wall_1', 'assets/sprites/cave_wall_1.png');
    this.load.image('cave_wall_2', 'assets/sprites/cave_wall_2.png');
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
    }

    this.map = [[]];

    this.max = 100;
    player = new Player('Player', 32, 32, null);
    player.init(this);
    let spawn = [];

    objects = [];
    this.map, spawn = generateCave(this, this.map, gameData.generation.cave, gameData.tiles, 
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
        player.moveTo = obj;
        
    }
}

function distanceTo(startX, startY, targetX, targetY) {
	return Math.sqrt((targetX-startX)**2 + (targetY - startY)**2);
}

function update()
{
    if(this.max < 10000) {
        this.max += 32;
    }
    for(let x = 0; x < gameData.generation.cave.maxWidth; x++) {
        for(let y = 0; y < gameData.generation.cave.maxHeight; y++) {
            if(this.map[x][y]){
                let distance = distanceTo(this.map[x][y].x, this.map[x][y].y, player.x, player.y);
                if(distance < this.max)
                {
                    this.map[x][y].draw(this);
                }
            }
        }
    }
    
    player.draw();

}