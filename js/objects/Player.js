class Player extends ActorBase{
    constructor(game, name, x, y, sprite, combat, charName)
    {
        super(game, name, x, y, sprite, combat);
        this.charName = charName;
        console.log(charName);
    }
}