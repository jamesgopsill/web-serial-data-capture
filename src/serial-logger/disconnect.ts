import type { SerialLogger } from "./index.js"

export async function disconnect(this: SerialLogger) {
	if (!this._port) return

	this._reader.cancel()
	await this._readableStreamClosed.catch(() => {
		/* Ignore the error */
	})

	this._port.close()

	//@ts-expect-error
	if ("serial" in navigator && "forget" in SerialPort.prototype) {
		await this._port.forget()
	}

	this._port = undefined
	this._reader = undefined
	this._readableStreamClosed = undefined
}

// https://stackoverflow.com/questions/71262432/how-can-i-close-a-web-serial-port-that-ive-piped-through-a-transformstream
