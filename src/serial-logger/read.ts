import type { SerialLogger } from "./index.js"

export async function read(this: SerialLogger) {
	while (true) {
		const { value: line, done } = await this._reader.read()
		if (done) {
			this._reader.releaseLock()
			break
		}
		this.viewport.append(line + "\n")
	}
	return
}
