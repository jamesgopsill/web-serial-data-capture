import { Plotter } from "./plotter/index.js"
import { SerialLogger } from "./serial-logger/index.js"

// Create connections to HTML elements.
const connectBtn = document.getElementById("connect") as HTMLButtonElement
connectBtn.addEventListener("click", () => {
	console.log("Connect Btn Clicked")
	logger.connect(parseInt(baud.value))
	startBtn.disabled = true
	stopBtn.disabled = false
})

const disconnectBtn = document.getElementById("disconnect") as HTMLButtonElement
disconnectBtn.addEventListener("click", () => {
	console.log("Disconnect Btn Clicked")
	logger.disconnect()
	startBtn.disabled = false
	stopBtn.disabled = false
})

const resetBtn = document.getElementById("reset") as HTMLButtonElement
resetBtn.addEventListener("click", () => {
	console.log("Reset Btn Clicked")
	logger.reset()
	plotter.redraw([])
})

const startBtn = document.getElementById("start") as HTMLButtonElement
startBtn.addEventListener("click", () => {
	console.log("Start Btn Clicked")
	logger.start()
	startBtn.disabled = true
	stopBtn.disabled = false
})

const stopBtn = document.getElementById("stop") as HTMLButtonElement
stopBtn.addEventListener("click", () => {
	console.log("Stop Btn Clicked")
	logger.stop()
	stopBtn.disabled = false
	startBtn.disabled = true
})

const downloadBtn = document.getElementById("download") as HTMLButtonElement
downloadBtn.addEventListener("click", () => {
	console.log("Download Btn Clicked")
	logger.download()
})

const refreshPlotBtn = document.getElementById("refresh") as HTMLButtonElement
refreshPlotBtn.addEventListener("click", () => {
	console.log("Refresh Plot Btn Clicked")
	const yIndices: number[] = []
	//@ts-expect-error
	for (const option of yAxisSelect.options) {
		if (option.selected) yIndices.push(parseFloat(option.value))
	}
	const x = parseFloat(xAxisSelect.value)

	if (!logger.data[x]) {
		alert("No data logged on the x axis.")
		return
	}

	for (const y of yIndices) {
		if (!logger.data[y]) {
			alert(`No data logged on y axis column ${y}`)
			return
		}
	}

	const traces: Plotly.Data[] = []

	for (const y of yIndices) {
		traces.push({
			x: logger.data[x],
			y: logger.data[y],
			name: y.toString(),
		})
	}

	plotter.redraw(traces)
})

const viewport = document.getElementById("log") as HTMLPreElement
const baud = document.getElementById("baud") as HTMLInputElement

const xAxisSelect = document.getElementById(
	"x-axis-select"
) as HTMLSelectElement
/*
xAxisSelect.addEventListener("change", () => {
	console.log(xAxisSelect.value, yAxisSelect.value)
})
*/
const yAxisSelect = document.getElementById(
	"y-axis-select"
) as HTMLSelectElement
/*
yAxisSelect.addEventListener("change", () => {
	console.log(xAxisSelect.value, yAxisSelect.value)
})
*/

const logger = new SerialLogger(viewport)
const plotter = new Plotter("plot")
