import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./App";
import { Writable } from "node:stream";

export async function render(url: string) {
	return new Promise((resolve, reject) => {
		let result = "";

		// Create a custom writable stream to capture the output
		const writable = new Writable({
			write(chunk, _, callback) {
				result += chunk.toString();
				callback();
			},
		});

		// Pipe the rendered stream into the custom writable stream
		const { pipe } = ReactDOMServer.renderToPipeableStream(
			<StaticRouter location={url}>
				<App />
			</StaticRouter>,
			{
				onShellReady() {
					pipe(writable);
				},
				onError(error) {
					reject(error);
				},
			},
		);

		// Resolve the promise when the stream ends
		writable.on("finish", () => {
			resolve(result);
		});

		// Reject the promise if there’s an error with the stream
		writable.on("error", (error) => {
			reject(error);
		});
	});
}
