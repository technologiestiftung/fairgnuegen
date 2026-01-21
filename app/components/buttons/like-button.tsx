import LikeIcon from "~/components/icons/like-icon";
import type { Offer } from "~/content/types";
import { useFavoritesStore } from "~/store/favorites-store";
import { useIsFavorite } from "~/hooks/use-is-favorite";
import { trackInteraction } from "~/analytics/matomo";
import { useI18n } from "~/i18n/use-i18n";
import { useLanguage } from "~/hooks/use-language";
import { Button } from "~/components/buttons/button";

export function LikeButton({ offer }: { offer: Offer }) {
	const { toggleFavorite } = useFavoritesStore();
	const isFavorite = useIsFavorite(offer);
	const language = useLanguage();
	const i18n = useI18n(language);

	return (
		<Button
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
		</Button>
	);
}
