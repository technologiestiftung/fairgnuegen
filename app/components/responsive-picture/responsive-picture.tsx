import { useLanguage } from "~/hooks/use-language.tsx";
import { useI18n } from "~/i18n/use-i18n.tsx";

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
	const language = useLanguage();
	const i18n = useI18n(language);

	const sizes = [640, 1024];
	const defaultSize = 1920;

	return (
		<picture className="relative">
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
				src={`/${src}-${defaultSize}w.webp`}
				alt={alt}
				loading={loading}
				width={defaultSize}
				height={defaultSize / 1.5}
				className={className}
			/>
			<p className="text-[11px] text-white/40 absolute bottom-[5px] right-[7px] z-10">
				{i18n["categories.all.imageCredit"]}
			</p>
		</picture>
	);
}
