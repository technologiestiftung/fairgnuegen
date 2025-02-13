type TrackingEvent = {
	eventCategory?: string;
	eventAction: string;
	eventName: string;
};

export function trackInteraction({
	eventCategory = "user-interaction",
	eventAction,
	eventName,
}: TrackingEvent) {
	/**
	 * Schema: ["trackEvent", "<event-category>", "<event-action>", "<event-name>"]
	 */
	window._paq.push(["trackEvent", eventCategory, eventAction, eventName]);
}

type SiteSearchEvent = {
	searchTerm: string;
	category?: string | null;
	resultsCount?: string | null;
};

export function trackSiteSearch({
	searchTerm,
	category = null,
	resultsCount = null,
}: SiteSearchEvent) {
	/**
	 * Schema: ["trackSiteSearch", "<keyword>", "<optional category>", "<optional results count>"]
	 */
	window._paq.push(["trackSiteSearch", searchTerm, category, resultsCount]);
}
