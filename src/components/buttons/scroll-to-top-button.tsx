import { ArrowUpIcon } from "../icons/arrow-up-icon.tsx";

export function ScrollToTopButton() {
	return (
		<button
			className="flex gap-x-2 p-2 w-48"
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
		>
			zum Seitenanfang <ArrowUpIcon className="bg-berlin-green" />
		</button>
	);
}
