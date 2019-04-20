class Combat{
    constructor(hp, mp, game)
    {
        this.hp = hp;
        this.maxHP = hp;
        this.mp = mp;
        this.maxMP = mp;
        this.barHP = null;
        this.barMP = null;
    }

    createBar(x, y, width, height, color, reverse, type, gui){
        if(type == 'hp'){
            this.barHP = new Bar(x, y, width, height, [this.hp, this.maxHP], color, reverse, gui);
            return this.barHP;
        } else {
            this.barMP = new Bar(x, y, width, height, [this.mp, this.maxMP], color, reverse, gui);
            return this.barMP;
        }
    }

    updateBars() {
        // Updates text of hp/mp bars to current values.
        this.barHP.values = [this.hp, this.maxHP];
        this.barMP.values = [this.mp, this.maxMP];
    }

    takeDamage(damage, takeFrom) {
        if(takeFrom == 'hp'){
            this.hp -= damage;
            if(this.hp < 0){ this.hp = 0 };
        } else {
            this.mp -= damage;
            if(this.mp < 0){ this.mp = 0 };
        }

        // Update hp/mp bars with current values.
        this.updateBars();
    }
}