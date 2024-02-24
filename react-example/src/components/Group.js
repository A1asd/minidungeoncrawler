export default function Group({group, socket}) {
	function leaveGroup() {
		socket.send(JSON.stringify({action: 'leaveGroup', data: {}}));
	}

	return <div id="group">
		{group ? <div>Gruppe:{group.playerList.map(player =>
			<div key={'group-' + player.id}>{player.id}</div>
		)}<button onClick={() => leaveGroup()}>leave</button></div> : ''}
	</div>
}
