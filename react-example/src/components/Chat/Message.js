export default function Message({message, sender}) {
	//TODO: make something like this, BUT parse message beforehand and dont set inner html -> return <div>{sender}: <span dangerouslySetInnerHTML={{__html: message}}></span></div>
	return <div>{sender}: {message}</div>
}
