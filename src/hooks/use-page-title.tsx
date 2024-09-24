import { useEffect } from "react";
import { content } from "../content/content";
import { useLocation } from "react-router-dom";

export function usePageTitle() {
	const location = useLocation();

	useEffect(() => {
		document.title = content[location.pathname].title;
	}, [location]);
}
