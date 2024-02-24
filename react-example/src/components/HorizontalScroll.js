import ScrollItem from "./ScrollItem"
import '../horizontalScroll.css';
import { Link } from "react-router-dom";

export default function HorizontalScroll({items, listPointer, setListPointer, scrollTranslation, routeTo}) {
	return <div className="horizontal-scroll" style={{transform: 'translateX(' + scrollTranslation + '%)'}}>
		{items.map((item, index) => {
			return <Link to={'album/' + index}>{<ScrollItem key={index} item={item} setListPointer={() => setListPointer(index)} active={index === listPointer} adjacent={index === listPointer + 1 || index === listPointer - 1} routeTo={routeTo}/>}</Link>
		})}
	</div>
}
