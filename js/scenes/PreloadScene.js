class PreloadScene extends Phaser.Scene {

    constructor()
    {
        super({ key: 'PreloadScene', active: true})
        
    }

    preload()
    {   
        // Load images.
        this.load.image('player', 'assets/sprites/character_plain.png');
        this.load.image('cave_wall_1', 'assets/sprites/cave_wall_1.png');
        this.load.image('cave_wall_2', 'assets/sprites/cave_wall_2.png');
        this.load.image('cave_floor', 'assets/sprites/cave_floor.png');
        this.load.image('cave_pile_of_rocks', 'assets/sprites/cave_pile_of_rocks.png');
        this.load.image('cave_stalagmites', 'assets/sprites/cave_stalagmites.png');

        // Load json data.
        this.load.json('config', 'data/config.json');
        this.load.json('cave', 'data/generation/cave.json');
        this.load.json('tiles', 'data/objects/tiles.json');

        // Load fonts.
        this.load.bitmapFont('courier_new_10px', 'assets/fonts/courier_new_10px.png', 'assets/fonts/courier_new_10px.fnt');
    }

    create()
    {
        // Launch Game.
        this.scene.run('GameScene');
    }
}