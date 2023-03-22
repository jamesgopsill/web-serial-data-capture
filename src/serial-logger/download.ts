import type { SerialLogger } from "./index.js"

export function download(this: SerialLogger) {
	const dataStr =
		"data:text/json;charset=utf-8," +
		encodeURIComponent(JSON.stringify(this.data))
	const downloadAnchorNode = document.createElement("a")
	downloadAnchorNode.setAttribute("href", dataStr)
	downloadAnchorNode.setAttribute("download", "serial-data.json")
	document.body.appendChild(downloadAnchorNode) // required for firefox
	downloadAnchorNode.click()
	downloadAnchorNode.remove()
}

//Refs.
// https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
