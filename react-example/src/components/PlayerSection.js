import { forwardRef, useImperativeHandle, useState } from "react";
import '../assets/css/player.css';
import Player from "../entities/Player.entity";
import Stat from "./Stat";
import Item from "./Item";
import Group from "./Group";

export default forwardRef(function PlayerSection({socket}, ref) {
	const [player, setPlayer] = useState(new Player());
	const [group, setGroup] = useState(null);
	const [invitation, setInvitation] = useState(null);

	useImperativeHandle(ref, () => {
		return {
			updatePlayer(playerObject) {
				setPlayer(playerObject);
			},
			updateGroup(groupObject) {
				setGroup(groupObject);
				console.log(groupObject);
			},
			recieveGroupInvite(data) {
				setInvitation({by: data.playerId, to: data.groupId});
			}
		}
	});

	function acceptInvite() {
		socket.send(JSON.stringify({action: 'acceptInvite', data: { invitedPlayerId: player.id, groupId: invitation.to }}));
		setInvitation(null);
	}

	function declineInvite() {
		setInvitation(null);
	}

	function unequip(slot) {
		socket.send(JSON.stringify({action: 'unequipItem', data: {slot:slot}}));
	}

	return <div id="player-window">
		<div id="player-avatar">avatar</div>
		<div id="player-stats">
			hp: {player.hp}/{player.maxHp}
			{player.statBag.bag.map(stat => <Stat key={stat.label} stat={stat} />)}
		</div>
		<div id="player-equipment">
			{player.equipment.weapon ? <span>{player.equipment.weapon.ref}<button onClick={() => unequip('weapon')}>unequip</button></span>:''}
			{player.equipment.head ? <span>{player.equipment.head.ref}<button onClick={() => unequip('head')}>unequip</button></span>:''}
			{player.equipment.chest ? <span>{player.equipment.chest.ref}<button onClick={() => unequip('chest')}>unequip</button></span>:''}
			{player.equipment.arms ? <span>{player.equipment.arms.ref}<button onClick={() => unequip('arms')}>unequip</button></span>:''}
			{player.equipment.legs ? <span>{player.equipment.legs.ref}<button onClick={() => unequip('legs')}>unequip</button></span>:''}
		</div>
		<div id="player-inventory">
			{player.inventory.map(item => <Item key={'item-' + item.id} item={item} socket={socket} />)}
		</div>
		{invitation ? <div>You have been invited by {invitation.by}
			<button onClick={() => acceptInvite()}>accept</button>
			<button onClick={() => declineInvite()}>decline</button>
		</div> : ''}
		<Group group={group} invitation={invitation} setInvitation={setInvitation} playerId={player.id} socket={socket} />
	</div>;
});
