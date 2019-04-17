class Bar{ // General use bar, mostly for hp/mp.
    constructor(x, y, width, height, values, color, game){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.values = values; // Array, [0] = current value, [1] = max value
        this.color = color;
        
        // Initialize graphics and text.
        this.bar  = game.add.graphics();
        let text = (this.values[0]+'/'+this.values[1]);
        this.text = game.add.bitmapText(x, y-1, 'century_gothic_12px', text);
        this.text.x = (this.text.x+this.text.fontSize);

        // Calculate width of foreground bar.
        this.foreWidth = (this.width/this.values[1])*this.values[0];
    }

    draw(){
        // Outline of bar.
        this.bar.fillStyle(this.color.outline)
        this.bar.fillRect(this.x-1, this.y-1, this.width+2, this.height+2);

        // Background of bar.
        this.bar.fillStyle(this.color.back)
        this.bar.fillRect(this.x, this.y, this.width, this.height);

        // Foreground of bar.
        this.bar.fillStyle(this.color.fore)
        this.bar.fillRect(this.x, this.y, this.foreWidth, this.height);
    }
}
