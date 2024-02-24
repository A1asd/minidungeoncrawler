import { getTilePosition } from '../../services/Tile.service';

export default function Tile({asset, assetConfigId, populationCount, moveFunction}) {
	let assetConfig = require('../../assets/tilesets/' + assetConfigId);
	let tilePosition = getTilePosition(asset, assetConfig);
	let tileSet = require('../../assets/tilesets/' + assetConfig.image);

	return <div className={"map-tile" + (moveFunction?' move-tile':'')} onClick={moveFunction}>
		<div className="tile-background" style={{backgroundImage: `url(${tileSet})`, backgroundPosition: `-${tilePosition[0]}px -${tilePosition[1]}px`}}></div>
		<span>{populationCount > 0 ? populationCount : ''}</span>
	</div>
}
