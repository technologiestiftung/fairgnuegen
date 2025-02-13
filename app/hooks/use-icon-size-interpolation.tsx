export function useIconSizeInterpolation() {
	const calculateIconSize = (zoom: number): number => {
		const zoomLevels = [0, 12, 22];
		const iconSizes = [0.15, 0.75, 1.5];

		if (zoom <= zoomLevels[0]) {
			return iconSizes[0];
		}
		if (zoom >= zoomLevels[2]) {
			return iconSizes[2];
		}

		for (let i = 0; i < zoomLevels.length - 1; i++) {
			const zoomStart = zoomLevels[i];
			const zoomEnd = zoomLevels[i + 1];
			const sizeStart = iconSizes[i];
			const sizeEnd = iconSizes[i + 1];
			if (zoom >= zoomStart && zoom < zoomEnd) {
				const t = (zoom - zoomStart) / (zoomEnd - zoomStart);
				return sizeStart + t * (sizeEnd - sizeStart);
			}
		}
		return iconSizes[0];
	};

	return {
		calculateIconSize,
	};
}
