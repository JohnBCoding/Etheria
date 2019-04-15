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
            let graphics = game.add.graphics();
            graphics.lineStyle(2, 0xffffff);
            this.highlight = graphics.strokeRoundedRect(this.x-(this.sprite.width/2), this.y-(this.sprite.height/2), 
                                                        this.sprite.width, this.sprite.height, 4);
            this.highlight.depth = 2;
        }
        
    }

    onMouseLeave(game){
        // Remove highlight on mouse leave.
        this.highlight.destroy();
        this.highlight = null;
    }
}