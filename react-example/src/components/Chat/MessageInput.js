import { useState } from "react";

export default function Message({socket}) {
	const [currentChatMessage, setCurrentChatMessage] = useState('');

	function chat() {
		let channel = 'all';
		socket.send(JSON.stringify({action: 'chat', data: {message:currentChatMessage, channel:channel}}));
		setCurrentChatMessage('');
	}

	return <div id="message-input">
		<input id="chat-message-input" value={currentChatMessage} onChange={(event) => setCurrentChatMessage(event.target.value)} type="text" placeholder="chat message" />
		<input type="button" onClick={() => chat()} value="send" />
	</div>
}
