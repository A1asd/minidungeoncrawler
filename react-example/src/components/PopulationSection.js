import { forwardRef, useImperativeHandle, useState } from "react";
import Populus from "./Population/Populus";
import Enemy from "./Population/Enemy";
import Nonplayer from "./Population/Nonplayer";

export default forwardRef(function PopulationSection({socket}, ref) {
	const [enemies, setEnemies] = useState([]);
	const [nonplayers, setNonplayers] = useState([]);
	const [allies, setAllies] = useState([]);
	const [players, setPlayers] = useState([]);

	useImperativeHandle(ref, () => {
		return {
			updatePopulation(gameObjects) {
				setEnemies(gameObjects.npcs);
				setNonplayers(gameObjects.objects);
				setAllies([]);
				setPlayers(gameObjects.pcs);
			}
		}
	});

	return <div id="population-window">
		<div id="current-location-enemies">
			{enemies.map((enemy) => <Enemy key={'enemy-' + enemy.id} enemy={enemy} socket={socket} />)}
		</div>
		<div id="current-location-nonplayers">
			{nonplayers.map((nonplayer) => <Nonplayer key={'nonplayer-' + nonplayer.id} nonplayer={nonplayer} socket={socket} />)}
		</div>
		<div id="current-location-allies">
			{allies.map((ally) => <Populus key={'ally-' + ally.id} player={ally} socket={socket} />)}
		</div>
		<div id="current-location-players">
			{players.map((player) => <Populus key={'player-' + player.id} player={player} socket={socket} />)}
		</div>
	</div>;
});
