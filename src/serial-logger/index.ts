import { connect } from "./connect.js"
import { disconnect } from "./disconnect.js"
import { read } from "./read.js"

export class SerialLogger {
	public viewport: HTMLPreElement = undefined

	protected _port: any = undefined
	protected _reader: ReadableStreamDefaultReader = undefined
	protected _readableStreamClosed: any = undefined

	constructor(viewport: HTMLPreElement) {
		this.viewport = viewport
		viewport.append("Hello from Serial Logger\n")
	}

	public connect = connect
	public disconnect = disconnect

	protected _read = read
}
