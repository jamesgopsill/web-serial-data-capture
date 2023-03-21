import { SerialLogger } from "./serial-logger/index.js"

const connectBtn = document.getElementById("connect") as HTMLButtonElement
connectBtn.addEventListener("click", () => {
	console.log("Connect Btn Clicked")
	logger.connect(parseInt(baud.value))
})
const disconnectBtn = document.getElementById("disconnect") as HTMLButtonElement
disconnectBtn.addEventListener("click", () => {
	console.log("Disconnect Btn Clicked")
	logger.disconnect()
})
const viewport = document.getElementById("log") as HTMLPreElement
const baud = document.getElementById("baud") as HTMLInputElement
const logger = new SerialLogger(viewport)
