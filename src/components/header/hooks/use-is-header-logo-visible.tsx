import { useEffect, useState } from "react";

export function useIsHeaderLogoVisible() {
	const [isHeaderLogoVisible, setIsHeaderLogoVisible] = useState(true);

	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY > 0) {
				setIsHeaderLogoVisible(false);
				return;
			}

			setIsHeaderLogoVisible(true);
		};

		window.addEventListener("scroll", onScroll);

		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	return isHeaderLogoVisible;
}
