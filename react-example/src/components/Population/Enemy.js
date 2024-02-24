import ActionComponent from "../ActionComponent";

export default function Enemy({enemy, socket}) {
	const attackFunction = () => {
		socket.send(JSON.stringify({action: 'attack', data: {id: enemy.id}}));
	}

	return <div>
		<span>{enemy.id} ({enemy.hp})</span>
		<ActionComponent label={'attack'} callbackFunction={attackFunction} disabled={false} />
	</div>
}
