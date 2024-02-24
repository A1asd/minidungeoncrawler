import './App.css';
import './assets/css/area.css';
import { useRef, useState } from 'react';
import MapSection from './components/MapSection';
import PlayerSection from './components/PlayerSection';
import PopulationSection from './components/PopulationSection';
import ChatSection from './components/ChatSection';
import LoginForm from './components/LoginForm';

function App({socket}) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [areaDescription, setAreaDescription] = useState('');
	const [areaEvents, setAreaEvents] = useState([]);
	const chatSection = useRef();
	const mapSection = useRef();
	const populationSection = useRef();
	const playerSection = useRef();

	socket.onmessage = function(message) {
		let data = JSON.parse(message.data);
		switch(data.action) {
			case ('loginSuccess'): handleLoginSuccess(); break;
			case ('drawMap'): mapSection.current.drawMap(data.data.tiles, data.data.configId); break;
			case ('updateLocation'): populationSection.current.updatePopulation(data.data); break;
			case ('updateArea'): setAreaDescription(data.data.description); setAreaEvents(data.data.events); console.log(data.data);break;
			case ('updatePlayer'): playerSection.current.updatePlayer(data.data.player); break;
			case ('updateGroup'): playerSection.current.updateGroup(data.data.group); break;
			case ('recieveMessage'): chatSection.current.drawMessage(data.data); break;
			case ('recieveGroupInvite'): playerSection.current.recieveGroupInvite(data.data); break;
			default: console.log('no valid action');
		}
	}

	function handleLoginSuccess() {
		setLoggedIn(true);
	}

	return (
		<main>
			{!loggedIn ? <LoginForm socket={socket} /> : ''}
			<div id="area-window">
				<div id="location-image">test image</div>
				<p>{areaDescription}</p>{
				areaEvents.map(areaEvent =>
					<p key={areaEvent.id}>{areaEvent.description} {areaEvent.actions.map(areaAction =>
						<span key={areaAction.id} onClick={() => {socket.send(JSON.stringify({action: 'triggerEvent', data: {eventId: areaAction}}))}}>[{areaAction.label}]</span>
					)}
					</p>)
			}</div>
			<MapSection ref={mapSection} socket={socket} />
			<ChatSection ref={chatSection} socket={socket} />
			<PlayerSection ref={playerSection} socket={socket} />
			<PopulationSection ref={populationSection} socket={socket} />
		</main>
	);
}

export default App;
