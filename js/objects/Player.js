class Player extends ActorBase{
    constructor(name, x, y, sprite)
    {
        super(name, x, y, sprite);
        this.moveTo = null;
        this.bar = null;
    }

    draw(game){
        if(this.moveTo){
            if(this.x != this.moveTo.x || this.y != this.moveTo.y){
                this.x += -((this.x-this.moveTo.x)/16)*2;
                this.y += -((this.y-this.moveTo.y)/16)*2;
                game.state = 'MOVEING';
                if(game.distanceTo(this.x, this.y, this.moveTo.x, this.moveTo.y) < 1){
                    game.state = 'ok';
                    this.moveTo = null;
                }
            } 
        } else {
            game.state = 'ok';
        }

        // Move sprite to current player coordinates.
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
}