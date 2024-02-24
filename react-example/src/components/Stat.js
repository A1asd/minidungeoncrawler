export default function Stat({stat}) {
	let displayMods;
	if (stat.modifications !== 0) displayMods = stat.modifications;
	return <div>
		<span>{stat.label}: {stat.value}{displayMods? ' (' + displayMods + ')' : ''}</span>
	</div>
}
