class Bar{ // General use bar, mostly for hp/mp.
    constructor(x, y, width, height, values, color, game){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.values = values; // Array, [0] = current value, [1] = max value
        this.color = color;

        this.bar  = game.add.graphics();
        // Calculate width of foreground bar.
        this.foreWidth = (this.width/this.values[1])*this.values[0];
    }

    draw(){
        // Outline of bar.
        this.bar.fillStyle(this.color.outline)
        this.bar.fillRect(this.x-1, this.y-1, this.width+2, this.height+2).setScrollFactor(0);

        // Background of bar.
        this.bar.fillStyle(this.color.back)
        this.bar.fillRect(this.x, this.y, this.width, this.height).setScrollFactor(0);

        // Foreground of bar.
        this.bar.fillStyle(this.color.fore)
        this.bar.fillRect(this.x, this.y, this.foreWidth, this.height).setScrollFactor(0);

        // Draws on top of other graphics.
        this.bar.depth = 2;
    }
}