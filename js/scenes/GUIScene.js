class GUIScene extends Phaser.Scene {

    constructor()
    {
        super({ key: 'GUIScene', active: false})
        
    }

    create()
    {
        let game = this.scene.get('GameScene');

        // Contianer for GUI elements.
        this.elements = [];

        this.guiFont = game.gameConfig.gui.font;

        // Create player hp/mp bars.
        let bar = game.player.combat.createBar(1, 1, game.gameConfig.gui.bars.width, game.gameConfig.gui.bars.height, 
                                             game.gameConfig.gui.bars.color.hp, false, 'hp', this);

        let bar2 = game.player.combat.createBar(game.cameras.main.width-game.gameConfig.gui.bars.width-1, 1, game.gameConfig.gui.bars.width, game.gameConfig.gui.bars.height, 
                                                game.gameConfig.gui.bars.color.mp, true, 'mp', this);
        
        this.elements.push(bar, bar2);
        this.highlight = null;

        // Create event listeners.
        game.events.on('drawHighlight', function(obj, config) { return this.drawHighlight(obj, config); }, this)
        game.events.on('destroyHighlight', function() { return this.destroyHighlight(); }, this)
    }

    update()
    {
        // Draw elements.
        for(let i = 0; i < this.elements.length; i++){
            this.elements[i].draw();
        }
    }

    drawHighlight(obj, config) {
        // Grab scene to get camera coords.
        let game = this.scene.get('GameScene');
        
        // Calculate actual x/y values offset by camera position.
        let offsetX = Math.round((obj.x-(obj.sprite.width/2))-game.cameras.main.worldView.x);
        let offsetY = Math.round((obj.y-(obj.sprite.height/2))-game.cameras.main.worldView.y);

        // Create a highlight rectangle around coords.
        if(!this.highlight){
            let graphics = this.add.graphics();
            if(obj.walkable){
                graphics.lineStyle(2, config.gui.highlights.walkable);
            } else {
                graphics.lineStyle(2, config.gui.highlights.unwalkable);
            }
            this.highlight = graphics.strokeRoundedRect(offsetX, offsetY, obj.sprite.width, obj.sprite.height, 4);

            // Draw objects name in bottom right corner of screen.
            this.highlight.text = this.add.bitmapText(game.cameras.main.width-60, game.cameras.main.height, this.guiFont, obj.name).setAlpha(0.6);;
            this.highlight.text.y -= (this.highlight.text.fontSize*1.5);

            // Set text color.
            this.highlight.text.setTintFill(0xffffff);
        }
    }

    destroyHighlight() {
        // Remove current highlight.
        if(this.highlight){
            this.highlight.text.destroy();
            this.highlight.destroy();
            this.highlight = null;
        }
    }
}
