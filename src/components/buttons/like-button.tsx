import LikeIcon from "../icons/like-icon";
import { Offer } from "../../content/content";
import { useFavoritesStore } from "../../store/favorites-store";
import { useIsFavorite } from "../../hooks/use-is-favorite";
import { trackInteraction } from "../../analytics/matomo.ts";
import { useI18n } from "../../i18n/use-i18n.tsx";
import { useLanguage } from "../../hooks/use-language.tsx";

export function LikeButton({ offer }: { offer: Offer }) {
	const { toggleFavorite } = useFavoritesStore();
	const isFavorite = useIsFavorite(offer);
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();
				trackInteraction({
					eventAction: "button click",
					eventName: `${isFavorite ? "unliked" : "liked"} favorite ${offer.provider} (from: ${window.location.pathname})`,
				});
				toggleFavorite(offer);
			}}
			aria-label={i18n["button.name.like"]}
			className="size-[44px]"
		>
			<LikeIcon isSelected={isFavorite}></LikeIcon>
		</button>
	);
}
