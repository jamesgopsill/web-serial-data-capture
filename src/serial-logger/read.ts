import type { SerialLogger } from "./index.js"

export async function read(this: SerialLogger) {
	// When connected, we will always be reading data from the serial connection.
	while (true) {
		const { value: line, done } = await this._reader.read()
		if (done) {
			this._reader.releaseLock()
			break
		}

		// If we are in logging mode.
		if (this._log) {
			// display the result to the <pre></pre> tag.
			this._viewport.prepend(line + "\n")
			// increment the counter index
			this._counter++
			// if the line is a csv data line.
			if (line.includes(",")) {
				// split out the csv line
				const elements = line.split(",")
				// append the results to the data dictionary
				for (const [i, value] of elements.entries()) {
					if (this.data[i] != undefined) {
						this.data[i].push(parseFloat(value))
					} else {
						console.log("setting data")
						this.data[i] = [parseFloat(value)]
					}
				}
				// update counter
				if (this.data[-1]) {
					this.data[-1].push(this._counter)
				} else {
					this.data[-1] = [this._counter]
				}
			}
		}
	}
	return
}
