import ActionComponent from "../ActionComponent";

export default function Nonplayer({nonplayer, socket}) {
	const pickupAction = () => {
		socket.send(JSON.stringify({action: 'pickup', data: {id: nonplayer.id}}));
	}

	return <div>
		<span>{nonplayer.ref}</span>
		<ActionComponent label={'pickup'} callbackFunction={pickupAction} />
	</div>
}
