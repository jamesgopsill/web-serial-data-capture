import { connect } from "./connect.js"
import { disconnect } from "./disconnect.js"
import { downloadData, downloadMessages } from "./download.js"
import { read } from "./read.js"

export class SerialLogger {
	public data: { [key: number]: number[] } = {}
	public messages: string[] = []

	protected _viewport: HTMLPreElement = undefined
	protected _port: any = undefined
	protected _reader: ReadableStreamDefaultReader = undefined
	protected _readableStreamClosed: any = undefined

	protected _writer: WritableStreamDefaultWriter = undefined
	protected _writableStreamClosed: Promise<void>

	protected _writer: WritableStreamDefaultWriter = undefined
	protected _writableStreamClosed: Promise<void>

	protected _counter: number = 0
	protected _log: boolean = true

	constructor(viewport: HTMLPreElement) {
		this._viewport = viewport
		this._viewport.insertAdjacentHTML(
			"beforeend",
			"<b>Hello from Serial Logger.</b>\n"
		)
	}

	public connect = connect
	public disconnect = disconnect
	public downloadData = downloadData
	public downloadMessages = downloadMessages
	public reset = () => {
		this.data = {}
		this.messages = []
		this._counter = 0
	}
	public start = () => {
		this._log = true
	}
	public stop = () => {
		this._log = false
	}
	public write = (line: string) => {
		if (this._writer !== undefined) this._writer.write(line + "\n")
	}

	protected _read = read
}
