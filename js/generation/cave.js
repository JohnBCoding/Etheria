function generateCave(game, map, config, tiles, width, height, tileWidth, tileHeight){
    // Fill map with walls.
    for(let x = 0; x < width; x++) {
        map.push([]);
        for(let y = 0; y < height; y++) {
            newWall = new Tile('Cave Wall', (x*tileWidth)+(tileWidth/2), (y*tileHeight)+(tileHeight/2), 
                                tiles['Cave Wall'].sprite_name, tiles['Cave Wall'].solid, 
                                tiles['Cave Wall'].walkable);
            map[x][y] = newWall;
        }
    }

    // Carve out cave via drunk walk.
    // Will return a completed map of tiles and a spawn point.
    let spawn = [];
    map, spawn = caveDrunkWalk(map, config, tiles, width, height);

    // Cave is complete, return map/spawn point.
    return map, spawn;
}

function caveDrunkWalk(map, config, tiles, width, height) {
	// Get generator presets.
    let maxFloors = config.maxFloors;
    let boundary = config.boundary;
    
	// Pick random starting point to start walking.
	console.log(boundary);
    let startX = Math.floor(Math.random() * ((width-boundary) - boundary) + boundary);
    let startY = Math.floor(Math.random() * ((height-boundary) - boundary) + boundary);
    console.log(startX, startY);
	
	// Create new tile on starting point.
    let newFloor = new Tile('Cave Floor', map[startX][startY].x, map[startX][startY].y, 
                            tiles['Cave Floor'].sprite_name, tiles['Cave Floor'].solid, 
                            tiles['Cave Floor'].walkable);
    map[startX][startY] = newFloor;

    // Created needed variables for walk.
	let directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
	let newX = startX;
    let newY = startY;
    let steps = 0;
    let mode = null;
	let stepDirection = null;
    
    // Walk in random directions till all floors are used up.
    while(maxFloors > 0) {
		// Switch betweeen modes when steps is 0.
		if(steps == 0) {
			if(mode == null){ // Always start with a cavern.
				mode = 'cavern';
			} else {
				// Calculate next mode based on preset chances.
				keys = Object.keys(config.modes);
				let chance = Math.floor(Math.random() * ((100) - 0) + 0);
				let totalChance = 0;
				for(let k = 0; k < keys.length; k++) {
					if(chance <= config['modes'][keys[k]].pickChance+totalChance) {
						mode = keys[k];
						break
					}

					totalChance += config['modes'][keys[k]].pickChance;
				}
			}

			// Calculate the number of steps the current mode will have to walk.
            steps = calculateSteps(config, mode);

			// Corridor only needs one direction per loop, so no need to grab a new one each time.
			if(mode == 'corridor') {
				stepDirection = directions[Math.floor(Math.random() * ((directions.length) - 0) + 0)];
			}
		}
		
		if(mode == 'cavern') {
			// Get random direction to step in.
			stepDirection = directions[Math.floor(Math.random() * ((directions.length) - 0) + 0)]

			// Check if step direction is within bounds of map and given limit.
			if(withinBounds(newX, newY, width, height, stepDirection, boundary)) {
				// It is within bounds so move there.
				newX += stepDirection[0];
				newY += stepDirection[1];

				// If new spot is a wall, turn it into a floor.
				if(map[newX][newY].solid) {
					// Pick type floor based on preset chance.
					let keys = Object.keys(config.tiles.floors);
					let floorName = null;
					while(true) {
						for(let k = 0; k < keys.length; k++) {
							let chance = Math.floor(Math.random() * ((100) - 0) + 0);
							if(chance <= config['tiles']['floors'][keys[k]]) {
								floorName = keys[k];
								break
							}
						}
						if(floorName) {
							break
						}
					}
					
					// Create floor.
					let newFloor = createTile(floorName, map[newX][newY].x, map[newX][newY].y, tiles);
					map[newX][newY] = newFloor;
					maxFloors -= 1;
				} else {
					// Not a wall so walk backwards.
					newX -= stepDirection[0];
					newY -= stepDirection[1];
				}
			} 

			steps -= 1;
		} else {
			// Check if position chosen is within map and limit bounds.
			if(withinBounds(newX, newY, width, height, stepDirection, boundary)) {
				// It is within bounds so move there.
				newX += stepDirection[0];
				newY += stepDirection[1];

				// If new spot is a wall, turn it into a floor.
				if(map[newX][newY].solid) {
					let newFloor = createTile('Cave Floor', map[newX][newY].x, map[newX][newY].y, tiles);
					map[newX][newY] = newFloor;
					maxFloors -= 1;
					steps -= 1;
				} else {
					// Not a wall, cancel corridor creation.
					steps = 0;
				}
			} else {
				// Out of bounds, cancel corridor creation.
				steps = 0;
			}
		}
	}

	// Return map and starting point of walk.
	return map, [map[startX][startY].x, map[startX][startY].y];
}

function calculateSteps(config, mode){
    // Calculates a random step count between min/max of given mode.
    let min = config.modes[mode]['steps']['min'];
    let max = config.modes[mode]['steps']['max'];
    let steps = Math.floor(Math.random() * ((max+1) - min) + min);

    return steps;
}

function withinBounds(x, y, width, height, direction, boundary) {
	if(x+direction[0] >= boundary && x+direction[0] < width-boundary) {
		if(y+direction[1] >= boundary && y+direction[1] < height-boundary) {
			return true;
		}
	}

	return false;
}

function createTile(name, x, y, tiles){
	let newTile = new Tile(name, x, y, tiles[name].sprite_name, 
						   tiles[name].solid, tiles[name].walkable);
	
	return newTile;
}