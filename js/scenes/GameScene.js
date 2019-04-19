class GameScene extends Phaser.Scene {

    constructor()
    {
        super({ key: 'GameScene', active: false })
    }

    create()
    {
        this.state = 'ok';

        // Grab loaded json data.
        this.gameConfig = this.cache.json.get('config');
        this.generation = { cave: this.cache.json.get('cave') };
        this.tiles = this.cache.json.get('tiles');

        this.map = [[]];

        this.max = 100;

        // Create/initialize player.
        this.player = new Player('Player', 32, 32, null);
        this.player.init(this);
        
        // Generate map 
        // Returns a completed map array and a spawn point for the player.
        let spawn = [];
        this.objects = [];
        this.map, spawn = generateCave(this, this.map, this.generation.cave, this.tiles, 
                                       this.generation.cave.maxWidth, this.generation.cave.maxHeight, 
                                       this.gameConfig.tile.width, this.gameConfig.tile.height);
        
        // Move player to spawn point.
        this.player.x = spawn[0];
        this.player.y = spawn[1];

        this.player.hp = 100;
        this.player.maxhp = 100;
        
        // Setup camera, make it follow the player.
        this.cameras.main.setBounds(0, 0, this.gameConfig.map.width*this.gameConfig.tile.width, 
                                    this.gameConfig.map.height*this.gameConfig.tile.height);
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
        for(let x = 0; x < this.generation.cave.maxWidth; x++) {
            for(let y = 0; y < this.generation.cave.maxHeight; y++) {
                if(this.map[x][y]){
                    let distance = this.distanceTo(this.map[x][y].x, this.map[x][y].y, this.player.x, this.player.y);
                    if(distance < this.max)
                    {
                        this.map[x][y].draw(this, this.gameConfig);
                    }
                }
            }
        }
    
        this.player.draw(this);
    }

    // Helper functions.
    distanceTo(startX, startY, targetX, targetY) {
        return Math.sqrt((targetX-startX)**2 + (targetY - startY)**2);
    }

    // Event Listeners.
    onClick(game, mouse, obj)
    {
        if(obj.parent.walkable){
            game.player.moveTo = obj;
        }
    }
}