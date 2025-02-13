const cache = new Map<string, string>();

export async function getBerlinFooter() {
	if (cache.has("berlin-footer")) {
		return cache.get("berlin-footer");
	}

	const fetchResponse = await fetch(
		"https://www.berlin.de/rbmskzl/aktuelles/__i9/std/landesfooter.inc",
	);
	const html = await fetchResponse.text();

	cache.set("berlin-footer", html);

	return cache.get("berlin-footer");
}
