import '../scrollItem.css';

export default function ScrollItem({item, active, adjacent, setListPointer, routeTo}) {
	return <div className={"scroll-item" + (active ? ' active': '') + (adjacent ? ' adjacent': '')} style={{backgroundImage: 'url(' + item.image + ')'}} onMouseEnter={() => setListPointer()} onClick={() => routeTo(item)}>
	</div>
}