class Bar{ // hp/mp bar.
    constructor(x, y, width, height, values, color, reverse, gui){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.values = values; // Array, [0] = current value, [1] = max value
        this.color = color;
        this.reverse = reverse;
        
        // Initialize graphics and text.
        this.bar  = gui.add.graphics();
        this.text = gui.add.bitmapText(x, y, gui.guiFont, '').setAlpha(0.6);
    }

    draw(){
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
        
        // Text ontop of bar.
        this.text.setText(this.values[0]+'/'+this.values[1]);
        this.text.x = this.x+(this.text.text.length);
    }
}
