class Bar{ // hp/mp bar.
    constructor(parent, x, y, width, height, values, color, reverse, gui){
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.values = values; // Array, [0] = current value, [1] = max value
        this.color = color;
        this.reverse = reverse;
        this.gui = gui;
        
        // Initialize graphics and text.
        this.bar  = gui.add.graphics();
        if(this.parent.name == 'player'){
            this.text = gui.add.bitmapText(x, y+1, gui.guiFont, '', 8).setAlpha(0.8);
        }
    }

    draw(){
        // Clear bar drawn before.
        this.bar.clear();
        
        // Calculate width of foreground bar.
        this.foreWidth = (this.width/this.values[1])*this.values[0];

        // Outline of bar.
        this.bar.fillStyle(this.color.outline)
        this.bar.fillRect(this.x-1, this.y-1, this.width+2, this.height+2);

        // Background of bar.
        this.bar.fillStyle(this.color.back)
        this.bar.fillRect(this.x, this.y, this.width, this.height);

        // Foreground of bar.
        this.bar.fillStyle(this.color.fore)

        if(this.reverse){
            this.bar.fillRect(this.x+(this.width-this.foreWidth), this.y, this.foreWidth, this.height);
        } else{
            this.bar.fillRect(this.x, this.y, this.foreWidth, this.height);
        }
        
        // Text ontop of bar, mobs don't get text on hp bars.
        if(this.parent.name == 'player'){
            this.text.setText(this.values[0]+'/'+this.values[1]);
            this.text.x = this.x+(this.text.text.length + ((this.text.fontSize - (this.text.text.length+1))*4))+1;
        }
    }
}
