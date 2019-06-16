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
        this.actors = this.cache.json.get('actors');

        // Grab loaded particle data.
        this.onHitParticles = this.cache.json.get('onHit');

        // Create particle emitters.
        this.particles = this.add.particles('particle_blood');
        this.particles.createEmitter(this.onHitParticles.basic);

        this.map = [[]];

        this.loadRange = 96;

        // Create/initialize player.
        this.player = new Player(this, 'player', 0, 0, 'player', 'combat', "Esrahaddon");
        this.player.combat = new Combat(this.player, 100, 100);
        
        
        // Generate map 
        // Returns a completed map array and a spawn point for the player.
        let spawn = [];
        this.actorsList = [];
        this.map, spawn = generateCave(this, this.map, this.generation.cave, this.tiles, 
                                       this.generation.cave.maxWidth, this.generation.cave.maxHeight, 
                                       this.gameConfig.tiles.width, this.gameConfig.tiles.height);
        
        // Move player to spawn point then init the player.
        this.player.x = spawn[0];
        this.player.y = spawn[1];
        this.player.init();
        
        // Setup camera, make it follow the player.
        this.cameras.main.setBounds(0, 0, this.gameConfig.map.width*this.gameConfig.tiles.width, 
                                    this.gameConfig.map.height*this.gameConfig.tiles.height);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.alpha = 0.8;

        // Create event listeners.
        this.input.on('gameobjectdown', function(mouse, obj, map){return this.onClick(mouse, obj, map)}, this);
        
        // Testing npcs.
        this.rat = new ActorBase(this, 'Mutated Rat', this.player.x+16, this.player.y+16, 'mutated_rat', 'combat');
        this.rat.combat = new Combat(this.rat, this.actors['Mutated Rat'].stats.hp, this.actors['Mutated Rat'].stats.mp);
        this.rat.init();
        this.actorsList.push(this.rat);
        // Launch GUI.
        this.scene.run('GUIScene');
    }

    update()
    {
        if(this.loadRange < 10000) {
            this.loadRange += 32;
        }

        for(let x = 0; x < this.generation.cave.maxWidth; x++) {
            for(let y = 0; y < this.generation.cave.maxHeight; y++) {
                if(this.map[x][y]){
                    let distance = this.distanceTo(this.map[x][y].x, this.map[x][y].y, this.player.x, this.player.y);
                    if(distance < this.loadRange)
                    {
                        this.map[x][y].draw(this, this.gameConfig);
                    }
                }
            }
        }
        
        if(this.player.path) {
            this.player.move();
        }
        this.player.draw();
    }

    // Helper functions.
    distanceTo(startX, startY, targetX, targetY) {
        return Math.sqrt((targetX-startX)**2 + (targetY - startY)**2);
    }

    // Event Listeners.
    onClick(mouse, obj)
    {
        let occupied = obj.parent.occupied;
        if(obj.parent.walkable && !this.player.path && !occupied) {
            this.player.path = new Astar(this.map, [], this.player, obj.parent, this.player.sprite.width, this);
            this.player.path.findPath();
        } else if(occupied) {
            occupied.combat.takeDamage(2, 'hp');
        }
    }
}