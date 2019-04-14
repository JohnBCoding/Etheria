class Tile{
    constructor(name, x, y, sprite, solid, walkable)
    {
        this.name = name;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.solid = solid;
        this.walkable = walkable;

        this.highlight = null;
    }

    init(game){
        // Creates and sets sprite of the tile.
        this.sprite = game.add.sprite(this.x, this.y, this.sprite).setInteractive();
        this.sprite.parent = this; // Allows access to base class when interacting with the sprite/character.

        // Create event listeners for mouse hover/leave
        this.sprite.on('pointerover', () => this.onMouseHover(game));
        this.sprite.on('pointerout', () => this.onMouseLeave(game));
    }

    draw(game){
        // Switches between tiles/characters depending on given setting.
        if(!this.sprite.x){  // Add sprite if not yet added.
            this.init(game);
        }
    }

    onMouseHover(game){
        // Create a rectangle around sprite when mouse hovers.
        if(!this.highlight){
            console.log(true);
            this.highlight = game.add.rectangle(this.x, this.y, 16, 16);
            this.highlight.setStrokeStyle(2, '0xffffff', 0.9);
            this.highlight.depth = 2;
        }
        
    }

    onMouseLeave(game){
        // Handles how the tile interacts once mouse leaves sprite area.
        this.highlight.destroy();
        this.highlight = null;
    }
}