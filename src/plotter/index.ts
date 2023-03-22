import * as Plotly from "plotly.js-dist-min"

export class Plotter {
	protected _id: string = ""
	protected _layout: Partial<Plotly.Layout> = {
		height: 400,
		font: {
			size: 14,
		},
		margin: {
			t: 5,
			r: 10,
			l: 40,
			b: 40,
		},
	}
	protected _config: Partial<Plotly.Config> = {
		responsive: true,
	}

	constructor(id: string) {
		this._id = id
		const trace: Plotly.Data[] = [
			{
				x: [0, 1, 2],
				y: [Math.random(), Math.random(), Math.random()],
				name: "0",
			},
			{
				x: [0, 1, 2],
				y: [Math.random(), Math.random(), Math.random()],
				name: "1",
			},
		]
		Plotly.newPlot(this._id, trace, this._layout, this._config)
	}

	public redraw = (data: Plotly.Data[]) => {
		Plotly.newPlot(this._id, data, this._layout, this._config)
	}
}
