import { useEffect } from "react";
import { content } from "../content/content.ts";

export function usePageTitle() {
	useEffect(() => {
		document.title = content[window.location.pathname].title;
	}, []);
}
