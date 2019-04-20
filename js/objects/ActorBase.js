class ActorBase{
    constructor(name, x, y, sprite, combat)
    {
        this.name = name;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.combat = combat;
    }

    init(game) {
        // Creates and sets the sprite for the player.
        this.sprite = game.add.sprite(this.x, this.y, this.sprite);
        this.sprite.depth = 1;
    }
}