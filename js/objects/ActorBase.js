class ActorBase{
    constructor(game, name, x, y, sprite, combat)
    {
        this.game = game;
        this.name = name;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.combat = combat;

        // Pathfinding.
        this.path = null;
        this.next = null;
        this.occupying = null;
    }

    init() {
        // Creates and sets the sprite for the actor.
        this.sprite = this.game.add.sprite(this.x, this.y, this.sprite);
        this.sprite.depth = 1;

        // Set the current tile on as occupied.
        let coords = this.getMapCoords(this.game.gameConfig.tiles.width);
        this.game.map[coords[0]][coords[1]].occupied = this;
        this.occupying = this.game.map[coords[0]][coords[1]];
    }

    draw(){
        // Move sprite to current actor coordinates.
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }

    move() {
        
        if(this.next == null){
            this.next = this.path.walk();
            if(!this.next){
                this.path = null;
                return;
            }
        }

        // Make sure current node knows its not occupied.
        this.x += -((this.x-this.next.x)/3);
        this.y += -((this.y-this.next.y)/3);

        if(this.path.heuristic(this, {x: this.next.x, y: this.next.y}) < 1){
            this.x = this.next.x;
            this.y = this.next.y;
            this.occupy(this.next);
            this.next = null;
        }
    }

    getMapCoords(tileSize) {
        let dx = (this.x-(tileSize/2))/tileSize;
        let dy = (this.y-(tileSize/2))/tileSize;

        return [dx, dy];
    }

    occupy(node){
        // Unoccupy previous node.
        this.occupying.occupied = null;

        // Occupy new node.
        node.occupied = this;
        this.occupying = node;
    }

    destroy() {
        // Handles removal of actor from the game.
        this.sprite.destroy();
        this.occupying.occupied = null;
    }
}
