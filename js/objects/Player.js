class Player{
    constructor(name, x, y, image, character, color)
    {
        this.name = name;
        this.x = x;
        this.y = y;
        this.image = image;
        this.character = character;
        this.color = color;
    }

    init(game) {
        // Creates and sets the sprite/character for the player.
        this.image = game.add.sprite(this.x, this.y, 'player');
        this.character = game.add.text(this.x, this.y, '@', {font: '16px Impact', fill: this.color.fore}).setOrigin(0.5);
        this.image.depth = 1;
        this.character.depth = 1;
    }

    draw(tiles){
        // Move image/character to current player coordinates.
        this.image.x = this.x;
        this.image.y = this.y;
        this.character.x = this.x;
        this.character.y = this.y;

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