type ResponsivePictureProps = {
	src: string;
	alt: string;
	loading: "lazy" | "eager";
	className: string;
};

export function ResponsivePicture({
	src,
	alt,
	loading,
	className,
}: ResponsivePictureProps) {
	const sizes = [640, 1024];
	const defaultSize = 1920;

	return (
		<picture>
			{sizes.map((size) => (
				<source
					key={size}
					srcSet={`/${src}-${size}w.webp`}
					type="image/webp"
					width={size}
					height={Math.round(size / 1.5)}
					media={`(max-width: ${size}px)`}
				/>
			))}
			<img
				src={`/${src}-${defaultSize}w.webp`}
				alt={alt}
				loading={loading}
				width={defaultSize}
				height={defaultSize / 1.5}
				className={className}
			/>
		</picture>
	);
}
