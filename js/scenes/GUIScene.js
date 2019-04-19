class GUIScene extends Phaser.Scene {

    constructor()
    {
        super({ key: 'GUIScene', active: false})
        
    }

    create()
    {
        let game = this.scene.get('GameScene');
        this.bar = new Bar(1, 1, game.gameConfig.gui.bars.width, game.gameConfig.gui.bars.height, 
                          [game.player.hp, game.player.maxhp], game.gameConfig.gui.bars.color.hp, false, this);

        this.bar2 = new Bar(game.cameras.main.width-game.gameConfig.gui.bars.width-1, 1, game.gameConfig.gui.bars.width, game.gameConfig.gui.bars.height, 
                           [game.player.hp, game.player.maxhp], game.gameConfig.gui.bars.color.mp, true, this);
        
        this.highlight = null;

        // Create event listeners.
        game.events.on('drawHighlight', function(x, y, width, height, config) { return this.drawHighlight(x, y, width, height, config);}, this)
        game.events.on('destroyHighlight', function(x, y, width, height, config) { return this.destroyHighlight(x, y, width, height, config);}, this)
    }

    update()
    {
        // Testing hp/mp bars.
        this.bar.draw();
        this.bar2.draw();
    }

    drawHighlight(obj, config) {
        // Grab scene to get camera coords.
        let game = this.scene.get('GameScene');
        
        // Calculate actual x/y values offset by camera position.
        let offsetX = Math.round((obj.x-(obj.sprite.width/2))-game.cameras.main.worldView.x);
        let offsetY = Math.round((obj.y-(obj.sprite.height/2))-game.cameras.main.worldView.y);

        // Create a targeting rectangle around coords.
        if(!this.highlight){
            let graphics = this.add.graphics();
            if(obj.walkable){
                graphics.lineStyle(2, config.gui.highlights.walkable);
            } else {
                graphics.lineStyle(2, config.gui.highlights.unwalkable);
            }
            
            this.highlight = graphics.strokeRoundedRect(offsetX, offsetY, obj.sprite.width, obj.sprite.height, 4);
        }
    }

    destroyHighlight() {
        // Remove current highlight.
        this.highlight.destroy();
        this.highlight = null;
    }
}
