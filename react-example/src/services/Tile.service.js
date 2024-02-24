export const getTilePosition = (asset, assetOptions) => {
	let tilePositionY = Math.floor(asset * assetOptions.tilewidth / assetOptions.imagewidth) * assetOptions.tileheight;
	let tilePositionX = asset * assetOptions.tilewidth % assetOptions.imagewidth;

	return [tilePositionX, tilePositionY];
}

export const two = (url) => {

}