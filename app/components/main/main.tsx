import { type ReactNode } from "react";
import { Breadcrumbs } from "~/components/header/breadcumbs";
import { LanguageSelect } from "~/components/header/language-select/language-select";

export function Main({ children }: { children: ReactNode }) {
	return (
		<main>
			<div className="bg-berlin-grey-light shadow-inner px-4 lg:px-0">
				<div className="flex justify-between max-w-[980px] mx-auto">
					<Breadcrumbs />
					<LanguageSelect />
				</div>
			</div>
			{children}
		</main>
	);
}
