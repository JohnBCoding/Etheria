class Tile{
    constructor(name, x, y, image, character, color, solid, walkable)
    {
        this.name = name;
        this.x = x;
        this.y = y;
        this.image = image;
        this.character = character;
        this.color = color;
        this.solid = solid;
        this.walkable = walkable;
    }

    init(game){
        // Creates and sets image/character of the tile.
        this.image = game.add.sprite(this.x, this.y, this.image).setInteractive();
        this.character = game.add.text(this.x, this.y, this.character, {font: '16px Arial', fill: this.color.fore}).setOrigin(0.5).setInteractive();

        // Allows access to base class when interacting with the sprite/character.
        this.image.parent = this;
        this.character.parent = this;
    }

    draw(tiles){
        // Switches between tiles/characters depending on given setting.
        if(tiles){
            this.character.visible = false;
            this.image.visible = true;
        } else {
            this.character.visible = true;
            this.image.visible = false;
        } 
    }
}