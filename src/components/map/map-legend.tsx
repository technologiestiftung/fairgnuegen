import React from "react";
import { Pill } from "../offer/pill";
import { categoryMap } from "../../content/categories";

const MapLegend: React.FC = () => {
	return (
		<div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
			<div>Kategorien</div>
			<div className="flex flex-row items-center gap-2">
				{Object.entries(categoryMap)
					.filter((c) => c[1].isRenderedInCategoryCards)
					.map((c) => (
						<Pill
							title={c[1].name}
							key={c[0]}
							backgroundColor={c[1].color}
							textColor={c[1].textColor}
							textSize="text-xs md:text-base"
						></Pill>
					))}
			</div>
		</div>
	);
};

export default MapLegend;
