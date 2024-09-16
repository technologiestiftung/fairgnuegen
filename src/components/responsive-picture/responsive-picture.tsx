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
	const sizes = [640, 1024, 1920];
	return (
		<picture>
			{sizes.map((size) => (
				<source
					key={size}
					srcSet={`/${src}-${size}w.webp`}
					type="image/webp"
					width={size}
					height={size / 1.5}
					media={`(max-width: ${size}px)`}
				/>
			))}
			<img
				src={`/${src}-original.webp`}
				alt={alt}
				loading={loading}
				className={className}
			/>
		</picture>
	);
}
