import { forwardRef, useImperativeHandle, useState } from "react";
import Message from "./Chat/Message";
import MessageInput from "./Chat/MessageInput";
import '../assets/css/chat.css';

export default forwardRef(function ChatSection({socket}, ref) {
	const [messages, setMessages] = useState([]);

	useImperativeHandle(ref, () => {
		return {
			drawMessage(messageObject) {
				let newArray = messages.slice();
				newArray.push(messageObject);
				setMessages(newArray);
			}
		}
	});

	return <div id="chat-window">
		<div id="chat-messages">
			{messages.map((message, index) => <Message key={index} sender={message.user} message={message.message} />)}
		</div>
		<MessageInput socket={socket} />
	</div>;
});
