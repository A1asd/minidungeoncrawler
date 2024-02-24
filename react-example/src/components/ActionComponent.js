
export default function ActionComponent({label, callbackFunction, disabled}) {
	return <input type='button' value={label} onClick={callbackFunction} disabled={disabled} />
}