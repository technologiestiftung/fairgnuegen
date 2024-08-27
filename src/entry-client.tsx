import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

function hydrate() {
	const root = document.getElementById("root");

	if (!root) {
		return;
	}

	if (import.meta.env.MODE === "development") {
		ReactDOM.createRoot(root).render(
			<BrowserRouter>
				<App />
			</BrowserRouter>,
		);
		// eslint-disable-next-line no-console
		console.log("CSR ⚠️");

		return;
	}

	ReactDOM.hydrateRoot(
		root,
		<BrowserRouter>
			<App />
		</BrowserRouter>,
	);
	// eslint-disable-next-line no-console
	console.log("hydrated 🚰");
}

hydrate();
