class Astar {
	constructor(map, objects, startNode, endNode, tileSize, game) {
		this.map = map;
		this.objects = objects;
		this.startNode = startNode;
		this.endNode = endNode;
		this.tileSize = tileSize;
		this.openSet = [this.startNode];
		this.closedSet = [];
		this.cameFrom = [];
		this.gScore = [[this.startNode, 0]];
		this.fScore = [[this.startNode, this.heuristic(this.startNode, this.endNode)]];
        this.path = [];
        
        this.game = game;
	}
	
	findPath() {
		let neighbors = [[0, -1], [1, 0], [0, 1], [-1, 0], [1, -1], [1, 1], [-1, -1], [-1, 1]];
		let current = null;
		let currentIndex = 0;
		let count = 0;
        
        // Loop till no nodes to check are left.
		while(this.openSet.length != 0) {
			let currentfScore = 10000;
			
			// If no current node, set current to the startNode.
			// Otherwise find the node with the lowest fScore and set it as current.
			for(let i = 0; i < this.openSet.length; i++) {
				if(!current) {
					current = this.openSet[0];
				} else {
					for(let h = 0; h < this.fScore.length; h++) {
						if(this.openSet[i] == this.fScore[h][0]) {
							if(this.fScore[h][1] < currentfScore) {
								current = this.fScore[h][0];
								currentfScore = this.fScore[h][1];
								currentIndex = i;
							}
						}
					}
				}
			}
            
            // Reached path goal.
			if(current == this.endNode) {
                console.log('finished');
				return this.reconstructPath(current);
			}
			
            // Remove evaluated neighbor from open set and add it to the closed set.
            this.openSet.splice(currentIndex, 1);
			this.closedSet.push(current);
			
			// Convert screen coords to map/grid coords.
			let startX = (current.x-(this.tileSize/2))/this.tileSize;
			let startY = (current.y-(this.tileSize/2))/this.tileSize;
            
			for(let n = 0; n < neighbors.length; n++) {
				let neighbor = this.map[startX+neighbors[n][0]][startY+neighbors[n][1]];
				
				// Go to next neighbor if neighbor has already been evaluated.
				if(this.closedSet.indexOf(neighbor)  != -1) {
                    continue;
				}
				
				// If neighbor tile is unwalkable, go to next neighbor.
				if(!neighbor.walkable || neighbor.occupied) {
                    this.closedSet.push(neighbor);
					continue;
				}

				// Grab gScore of current node.
				let currentgScore = 0;
				for(let g = 0; g < this.gScore.length; g++) {
					if(this.gScore[g][0] == current) {
						currentgScore = this.gScore[g][1];
					}
				}
				
				// Calculate new gScore and neighbor movement cost.
				let tempgScore = currentgScore + this.heuristic(current, neighbor);
				let neighborScore = this.heuristic(this.startNode, neighbor);
                
                // Add neighbor to open set if it isn't already in the open set.
                // Otherwise compare scores.
				if(this.openSet.indexOf(neighbor)  == -1) {
                    this.openSet.push(neighbor);
				} else if (tempgScore >= neighborScore) { 
                    // Go to next neighbor if new gScore is worse than neighbor movement cost.
					continue;
				}
				
				// If all tests are passed add neighbor to cameFrom, gScore and fScore lists.
				this.cameFrom.push([neighbor, current]);
                this.gScore.push([neighbor, tempgScore]);
				this.fScore.push([neighbor, tempgScore + this.heuristic(neighbor, this.endNode)]);
			}
			
			// Used for testing so infinite loops do not happen.
			count += 1;
			if(count > 1000) {
				return "looped";
			}
		}
	}
		
	reconstructPath(current) {
		// Walks the path backwards until the startNode is reached.
		// Then path is reversed so the path is in order from startNode -> endNode.
		this.path = [current];
		
		while(current != this.startNode) {
			for(let i = 0; i < this.cameFrom.length; i++) {
				if(this.cameFrom[i][0] == current) {
					current = this.cameFrom[i][1];
					this.path.push(current);
				}
			}
		}
		
		this.path.reverse()
		this.path.splice(0, 1); // startNode is removed from path, not needed when walking the path.
	}
	
	walk() {
		// Grabs the next node in the path, removes it from the path then returns the node.
		if(this.path.length > 0) {
			let node = this.path[0];
			this.path.splice(0, 1);
			return node;
		}
		
		return null;
    }

    heuristic(startNode, endNode) {
        // Calculates heuristic via diagonal distance.
        // Diagonals cost the same as any other movement.
        let  cost = 1;
        let dx = Math.abs(startNode.x - endNode.x);
        let dy = Math.abs(startNode.y - endNode.y);
        return cost * (dx + dy) + (cost - 2 * cost) * Math.min(dx, dy);
    }

}