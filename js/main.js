class GameScene extends Phaser.Scene {

    constructor()
    {
        super({ key: 'GameScene', active: true })
    }

    preload()
    {
        // Load images.
        this.load.image('player', 'assets/sprites/character_plain.png');
        this.load.image('cave_wall_1', 'assets/sprites/cave_wall_1.png');
        this.load.image('cave_wall_2', 'assets/sprites/cave_wall_2.png');
        this.load.image('cave_floor', 'assets/sprites/cave_floor.png');
        this.load.image('cave_cracked_floor', 'assets/sprites/cave_cracked_floor.png');
        this.load.image('cave_stalagmites', 'assets/sprites/cave_stalagmites.png');

        // Load data.
        this.load.json('config', 'data/config.json');
        this.load.json('cave', 'data/generation/cave.json');
        this.load.json('tiles', 'data/objects/tiles.json');
    }

    create()
    {
        this.gameData = {
            config: this.cache.json.get('config'),
            generation: {
                cave: this.cache.json.get('cave')
            },
            tiles: this.cache.json.get('tiles'),
        }

        this.map = [[]];

        this.max = 100;

        // Create/initialize player.
        this.player = new Player('Player', 32, 32, null);
        this.player.init(this);
        
        // Generate map 
        // Returns a completed map array and a spawn point for the player.
        let spawn = [];
        this.objects = [];
        this.map, spawn = generateCave(this, this.map, this.gameData.generation.cave, this.gameData.tiles, 
                                       this.gameData.generation.cave.maxWidth, this.gameData.generation.cave.maxHeight, 
                                       this.gameData.config.tile.width, this.gameData.config.tile.height);
        
        // Move player to spawn point.
        this.player.x = spawn[0];
        this.player.y = spawn[1];

        this.player.hp = 80;
        this.player.maxhp = 100;
        
        // Setup camera, make it follow the player.
        this.cameras.main.setBounds(0, 0, this.gameData.config.map.width*this.gameData.config.tile.width, 
                                    this.gameData.config.map.height*this.gameData.config.tile.height);
        this.cameras.main.startFollow(this.player);

        // Create event listeners.
        this.input.on('gameobjectdown', function(mouse, obj){return this.onClick(this, mouse, obj)}, this);

        // Launch GUI.
        this.scene.run('GUIScene');

    }

    update()
    {
        if(this.max < 10000) {
            this.max += 32;
        }
        for(let x = 0; x < this.gameData.generation.cave.maxWidth; x++) {
            for(let y = 0; y < this.gameData.generation.cave.maxHeight; y++) {
                if(this.map[x][y]){
                    let distance = distanceTo(this.map[x][y].x, this.map[x][y].y, this.player.x, this.player.y);
                    if(distance < this.max)
                    {
                        this.map[x][y].draw(this, this.gameData.config);
                    }
                }
            }
        }
    
        this.player.draw();
    }

    // Event Listeners.
    onClick(game, mouse, obj)
    {
        if(obj.parent.walkable){
            game.player.moveTo = obj;
        }
    }
}

class GUIScene extends Phaser.Scene {

    constructor()
    {
        super({ key: 'GUIScene', active: false})
        
    }

    preload()
    {
        // Load fonts.
        this.load.bitmapFont('century_gothic_12px', 'assets/fonts/century_gothic_12px.png', 'assets/fonts/century_gothic_12px.fnt');
    }

    create()
    {
        let main = this.scene.get('GameScene');
        this.bar = new Bar(1, 1, main.gameData.config.gui.bars.width, main.gameData.config.gui.bars.height, 
                    [main.player.hp, main.player.maxhp], main.gameData.config.gui.bars.color.hp, this);
    }

    update()
    {
        // Testing hp/mp bars.
        this.bar.draw();
    }
}

var config = {
    type: Phaser.AUTO,
    backgroundColor: '#424242',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 256,
        height: 256,
        //width: 1024,
        //height: 896,
        max: {
            width: 1024,
            height: 1024
        },
        parent: 'game_container'
    },
    scene: [GameScene, GUIScene]
};

var game = new Phaser.Game(config);

function distanceTo(startX, startY, targetX, targetY) {
	return Math.sqrt((targetX-startX)**2 + (targetY - startY)**2);
}

