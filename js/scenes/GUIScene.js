class GUIScene extends Phaser.Scene {

    constructor()
    {
        super({ key: 'GUIScene', active: false})
    }

    create()
    {
        // Grab connect to game scene.
        this.game = this.scene.get('GameScene');

        // Contianer for GUI elements.
        this.elements = [];

        this.guiFont = this.game.gameConfig.gui.font;

        // Create player hp/mp bars.
        let bar = this.game.player.combat.createBar(1, 1, this.game.gameConfig.gui.bars.width, this.game.gameConfig.gui.bars.height, 
                                             this.game.gameConfig.gui.bars.color.hp, false, 'hp', this);

        let bar2 = this.game.player.combat.createBar(this.game.cameras.main.width-this.game.gameConfig.gui.bars.width-1, 1, 
                                                     this.game.gameConfig.gui.bars.width, this.game.gameConfig.gui.bars.height, 
                                                     this.game.gameConfig.gui.bars.color.mp, true, 'mp', this);

        this.game.rat.combat.createBar(0, 0, 8, 1, this.game.gameConfig.gui.bars.color.hp, false, 'hp', this);
        this.elements.push(bar, bar2);
        this.highlight = null;
        this.highlighted = null;
        
        // Create event listeners.
        this.game.events.on('drawHighlight', function(obj) { return this.highlighted = obj; }, this)
        this.game.events.on('destroyHighlight', function() { return this.destroyHighlight(); }, this)
    }

    update()
    {
        // Draw elements.
        for(let i = 0; i < this.elements.length; i++){
            this.elements[i].draw();
        }

        this.drawHighlight();

        // Update coords/draw health bars of mobs.
        for(let i = 0; i < this.game.actorsList.length; i++){
            let combat = this.game.actorsList[i].combat;
            if(combat){
                if(combat.barHP){
                    combat.barHP.x = Math.round(this.game.actorsList[i].x-4-this.game.cameras.main.worldView.x);
                    combat.barHP.y = Math.round(this.game.actorsList[i].y-8-this.game.cameras.main.worldView.y);
                    combat.barHP.draw();
                }
            } 
        }
    }

    drawHighlight() {
        // Redraw every frame.
        let config = this.game.gameConfig;
        if(this.highlight){
            this.highlight.text.destroy();
            this.highlight.clear();
        }

        if(this.highlighted){
            // Calculate actual x/y values offset by camera position.
            let offsetX = Math.round((this.highlighted.x-(10))-this.game.cameras.main.worldView.x);
            let offsetY = Math.round((this.highlighted.y-(10))-this.game.cameras.main.worldView.y);

            // Create a highlight rectangle around coords.
            let graphics = this.add.graphics();
            // Different colors depending on the status of the obj.
            if(!this.highlighted.walkable){
                graphics.lineStyle(2, config.gui.highlights.unwalkable);
            } else if(this.highlighted.occupied){
                graphics.lineStyle(2, config.gui.highlights.target);
            } else {
                graphics.lineStyle(2, config.gui.highlights.walkable);
            }
            this.highlight = graphics.strokeRoundedRect(offsetX, offsetY, 20, 20, 7);

            // Draw objects name in bottom right corner of screen.
            let text = this.highlighted.name
            if(this.highlighted.occupied){
                text = this.highlighted.occupied.name;
                if(text == 'player'){
                    text = this.highlighted.occupied.charName;
                }
            }

            // Draw text.
            this.highlight.text = this.add.bitmapText(this.game.cameras.main.width-60, this.game.cameras.main.height, this.guiFont, text).setAlpha(0.6);
            this.highlight.text.y -= (this.highlight.text.fontSize*1.5);

            // Set text color.
            this.highlight.text.setTintFill(config.gui.highlights.text);
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
