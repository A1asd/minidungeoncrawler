export default function Item({item, socket}) {
	function use() {
		socket.send(JSON.stringify({action: 'useItem', data: {itemId:item.id}}));
	}

	function equip() {
		socket.send(JSON.stringify({action: 'equipItem', data: {itemId:item.id}}));
	}

	function discard() {
		socket.send(JSON.stringify({action: 'dropItem', data: {itemId:item.id}}));
	}

	return <div className='item' key={item.id}>{item.ref[0].toUpperCase()}
		{item.usable ? <button onClick={() => use()}>use</button> : ''}
		{item.equippable ? <button onClick={() => equip()}>equip</button> : ''}
		<button onClick={() => discard()}>discard</button>
	</div>
}
