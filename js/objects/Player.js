class Player{
    constructor(name, x, y, sprite)
    {
        this.name = name;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.moveTo = null;
    }

    init(game) {
        // Creates and sets the sprite for the player.
        this.sprite = game.add.sprite(this.x, this.y, 'player');
        this.sprite.depth = 1;
    }

    draw(){
        if(this.moveTo){
            if(this.x != this.moveTo.x || this.y != this.moveTo.y){
                this.x += -((this.x-this.moveTo.x)/16)*2;
                this.y += -((this.y-this.moveTo.y)/16)*2;
            }
        }

        // Move sprite to current player coordinates.
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
}