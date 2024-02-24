const Tile = require("./Tile");

class Map {
	/**
	 * @param {[...[...Tile]]} tiles
	 */
	tiles = [];
	mapBasePath = '../../';
	assetConfigId;

	constructor(map) {
		let mapJson = require(this.mapBasePath + map);
		this.assetConfigId = mapJson.tilesets[0].source;
		let tileSet = require(this.mapBasePath + mapJson.tilesets[0].source);
		let row = [];
		let count = 0;
		while (count < mapJson.layers[0].data.length) {
			let walkable = tileSet.tiles.filter(tile => tile.id === mapJson.layers[0].data[count] - 1).length > 0 ? tileSet.tiles.filter(tile => tile.id === mapJson.layers[0].data[count] - 1)[0].properties.filter(prop => prop.name === 'block').length > 0 ? !tileSet.tiles.filter(tile => tile.id === mapJson.layers[0].data[count] - 1)[0].properties.filter(prop => prop.name === 'block')[0].value : true : true;
			let events = tileSet.tiles.filter(tile => tile.id === mapJson.layers[0].data[count] - 1).length > 0 ? tileSet.tiles.filter(tile => tile.id === mapJson.layers[0].data[count] - 1)[0].properties.filter(prop => prop.name === 'event').length > 0 ? tileSet.tiles.filter(tile => tile.id === mapJson.layers[0].data[count] - 1)[0].properties.filter(prop => prop.name === 'event').map(val => val.value) : [] : [];
			row.push(new Tile(
				mapJson.layers[0].data[count] - 1,
				walkable,
				tileSet.name + '-' + (mapJson.layers[0].data[count] - 1).toString(),
				events
			));
			if (row.length === mapJson.layers[0].width) {
				this.tiles.push(row);
				row = [];
			}
			count++;
		}
	}

	atPosition(position) {
		return this.tiles[position.y][position.x];
	}

	getTile(position) {
		return this.tiles[position.y][position.x];
	}

	changeTile(position, tile) {
		this.tiles[position.y][position.x] = tile;
	}
}

module.exports = Map;
