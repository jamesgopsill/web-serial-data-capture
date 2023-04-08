import type { SerialLogger } from "./index.js"

export function downloadData(this: SerialLogger) {
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

export function downloadMessages(this: SerialLogger) {
	const dataStr =
		"data:text/plain;charset=utf-8," +
		encodeURIComponent(this.messages.join("\n"))
	const downloadAnchorNode = document.createElement("a")
	downloadAnchorNode.setAttribute("href", dataStr)
	downloadAnchorNode.setAttribute("download", "serial-messages.txt")
	document.body.appendChild(downloadAnchorNode) // required for firefox
	downloadAnchorNode.click()
	downloadAnchorNode.remove()
}

//Refs.
// https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
