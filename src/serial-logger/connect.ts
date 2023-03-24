import type { SerialLogger } from "./index.js"
import { LineBreakTransformer } from "./line-break-controller.js"

export async function connect(this: SerialLogger, baudRate: number) {
	if (!("serial" in navigator)) {
		alert("This browser does not support Web Serial.")
		return
	}

	try {
		this._port = await navigator.serial
			//@ts-expect-error
			.requestPort()
	} catch (err: any) {
		console.log(err)
		alert("No port selected.")
		this._port = undefined
		return
	}
	if (!this._port) {
		alert("No port selected.")
		return
	}

	await this._port.open({ baudRate: baudRate })

	const textDecoder = new TextDecoderStream()
	this._readableStreamClosed = this._port.readable.pipeTo(textDecoder.writable)
	const reader = textDecoder.readable
		.pipeThrough(new TransformStream(new LineBreakTransformer()))
		.getReader()
	this._reader = reader

	this._read()

	const encoder = new TextEncoderStream()
	this._writableStreamClosed = encoder.readable.pipeTo(this._port.writable)
	this._writer = encoder.writable.getWriter()

	this._log = true

	this._viewport.append("Connected\n")
}
