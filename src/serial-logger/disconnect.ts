import type { SerialLogger } from "./index.js"

export async function disconnect(this: SerialLogger) {
	if (!this._port) return

	this._reader.cancel()
	await this._readableStreamClosed.catch(() => {
		/* Ignore the error */
	})

	this._writer.close()
	await this._writableStreamClosed

	this._writer.close()
	await this._writableStreamClosed

	this._port.close()

	if ("serial" in navigator && "forget" in SerialPort.prototype) {
		await this._port.forget()
	}

	this._port = undefined

	this._reader = undefined
	this._readableStreamClosed = undefined

	this._writer = undefined
	this._writableStreamClosed = undefined

	this._log = false

	this._viewport.insertAdjacentHTML("afterbegin", "<b>Disconnected.</b>\n")
}

//Refs.
// https://stackoverflow.com/questions/71262432/how-can-i-close-a-web-serial-port-that-ive-piped-through-a-transformstream
