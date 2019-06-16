class Tile {
    constructor(name, x, y, sprite, solid, walkable)
    {
        this.name = name;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.solid = solid;
        this.walkable = walkable;

        this.occupied = false;
        this.highlight = null;
    }

    init(game, config){
        // Creates and sets sprite of the tile.
        this.sprite = game.add.sprite(this.x, this.y, this.sprite).setInteractive();
        this.sprite.parent = this; // Allows access to base class when interacting with the sprite/character.

        // Create event listeners for mouse hover/leave
        this.sprite.on('pointerover', function(){ game.events.emit('drawHighlight', this, config); }, this);
        this.sprite.on('pointerout', function(){ game.events.emit('destroyHighlight'); }, this);
    }

    draw(game, config){
        // Switches between tiles/characters depending on given setting.
        if(!this.sprite.x){  // Add sprite if not yet added.
            this.init(game, config);
        }
    }
}