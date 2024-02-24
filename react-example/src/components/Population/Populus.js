export default function Populus({player, socket}) {
	function invitePlayer() {
		socket.send(JSON.stringify({action: 'sendInvite', data: { invitedPlayerId: player.id }}));
	}

	return <div>
		<span>
			{player.id}
			{!player.group ? <button onClick={() => invitePlayer()}>invite</button> : ''}
		</span>
	</div>
}
