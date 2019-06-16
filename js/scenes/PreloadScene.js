class PreloadScene extends Phaser.Scene {

    constructor()
    {
        super({ key: 'PreloadScene', active: true})
        
    }

    preload()
    {   
        // Load images.
        // Actors.
        this.load.image('player', 'assets/sprites/character_plain.png');
        this.load.image('mutated_rat', 'assets/sprites/mutated_rat.png');

        // Tiles
        this.load.image('cave_wall_1', 'assets/sprites/cave_wall_1.png');
        this.load.image('cave_wall_2', 'assets/sprites/cave_wall_2.png');
        this.load.image('cave_floor', 'assets/sprites/cave_floor.png');
        this.load.image('cave_pile_of_rocks', 'assets/sprites/cave_pile_of_rocks.png');
        this.load.image('cave_stalagmites', 'assets/sprites/cave_stalagmites.png');

        // Effects
        this.load.image('particle_blood', 'assets/sprites/particle_blood.png');

        // Load json data.
        this.load.json('config', 'data/config.json');
        this.load.json('cave', 'data/generation/cave.json');
        this.load.json('tiles', 'data/objects/tiles.json');
        this.load.json('actors', 'data/objects/actors.json');

        // Particle data.
        this.load.json('onHit', 'data/particles/onHit.json');

        // Load fonts.
        this.load.bitmapFont('kenny_mini_8px', 'assets/fonts/kenny_mini_8px.png', 'assets/fonts/kenny_mini_8px.fnt');
    }

    create()
    {
        // Launch Game.
        this.scene.run('GameScene');
    }
}