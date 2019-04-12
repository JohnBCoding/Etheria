function generateCave(game, map, config, tiles, width, height, tileWidth, tileHeight){
    // Fill map with walls.
    for(let x = 0; x < width; x++) {
        map.push([]);
        for(let y = 0; y < height; y++) {
            newWall = new Tile('Cave Wall', (x*tileWidth)+(tileWidth/2), (y*tileHeight)+(tileHeight/2), 
                                tiles['Cave Wall'].image_name, tiles['Cave Wall'].character, 
                                tiles['Cave Wall'].color, tiles['Cave Wall'].solid, tiles['Cave Wall'].walkable);
            map[x][y] = newWall;
        }
    }

    // 
    let spawn = caveDrunkWalk(map, config, tiles, width, height);
    // Init the finished tiles in the created map.
    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
            map[x][y].init(game);
        }
    }

    return map, spawn;
}

function caveDrunkWalk(map, config, tiles, width, height) {
	// Get generator presets.
    let maxFloors = config.maxFloors;
	let modes = ['corridor', 'cave'];
    let boundary = config.boundary;
    
	// Pick random starting point to start walking.
    let startX = Math.floor(Math.random() * (width-boundary + 1)) + boundary;
    let startY = Math.floor(Math.random() * (height-boundary + 1)) + boundary;
    console.log(startX);
    console.log(startY);
	
	// Create new tile on starting point.
    let newFloor = new Tile('Cave Floor', map[startX][startY].x, map[startX][startY].y, 
                            tiles['Cave Floor'].image_name, tiles['Cave Floor'].character, 
                            tiles['Cave Floor'].color, tiles['Cave Floor'].solid, 
                            tiles['Cave Floor'].walkable);
    map[startX][startY] = newFloor;

    // Created needed variables for walk.
    let directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
	let newX = startX;
	let newY = startY;
	let steps = 0;
	let limit = 0;
	let mode = null;
	let corridorDirection = null;
    let caveDirection = null;
    
    // Walk in random directions till all floors are used up.


	// Return starting point of walk.
	return [map[startX][startY].x, map[startX][startY].y];
}