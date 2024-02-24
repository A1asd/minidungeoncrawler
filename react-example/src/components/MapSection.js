import { forwardRef, useImperativeHandle, useState } from "react";
import Tile from "./Map/Tile";
import '../assets/css/map.css';

const centerControls = 2;

export default forwardRef(function MapSection({socket}, ref) {
	const [mapTiles, setMapTiles] = useState([]);
	const [assetConfigId, setAssetConfigId] = useState([]);
	useImperativeHandle(ref, () => {
		return {
			drawMap(tiles, configId) {
				let newMapTiles = [];
				for (let i = 0; i < tiles.length; i++) {
					for (let j = 0; j < tiles[i].length; j++) {
						let directional = (i===centerControls-1|i===centerControls+1?j===centerControls:(j===centerControls-1|j===centerControls+1?i===centerControls:false))

						if (directional) {
							let directionVector = {x: j - centerControls, y: i - centerControls};
							newMapTiles.push({asset:tiles[i][j].asset, populationCount:tiles[i][j].pcs.length, clickHandle:() => move(directionVector)});
						} else if (centerControls === i && centerControls === j) {
							newMapTiles.push({asset:tiles[i][j].asset, populationCount:tiles[i][j].pcs.length, middle: true});
						}else {
							newMapTiles.push({asset:tiles[i][j].asset, populationCount:tiles[i][j].pcs.length});
						}
					}
				}
				setMapTiles(newMapTiles);
				setAssetConfigId(configId);
			}
		}
	});

	/**
	 * @param {Object} vector
	 * @param {number} vector.x
	 * @param {number} vector.y
	 */
	function move(vector) {
		socket.send(JSON.stringify({action: 'move', data:vector}));
	}

	return <div id="mapField">
		{mapTiles.map((tile, index) => {
			return <Tile key={index} asset={tile.asset} assetConfigId={assetConfigId} populationCount={tile.populationCount} moveFunction={tile.clickHandle} middle={tile.middle} />;
		})}
	</div>;
});
