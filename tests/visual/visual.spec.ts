import { test, expect } from "@playwright/test";

const routes = [
	// home page
	{ route: "/", isFullPageScreenshot: true },
	{ route: "/en/", isFullPageScreenshot: true },

	// all offers page
	{ route: "/all-offers/", isFullPageScreenshot: false },
	{ route: "/en/all-offers/", isFullPageScreenshot: false },

	// only offers from category "Kultur"
	{ route: "/all-offers/?category=kultur", isFullPageScreenshot: false },
	{ route: "/en/all-offers/?category=kultur", isFullPageScreenshot: false },

	// only offers from category "Sport"
	{ route: "/all-offers/?category=sport", isFullPageScreenshot: false },
	{ route: "/en/all-offers/?category=sport", isFullPageScreenshot: false },

	// only offers from category "Bildung und Beratung"
	{
		route: "/all-offers/?category=bildung_beratung",
		isFullPageScreenshot: false,
	},
	{
		route: "/en/all-offers/?category=bildung_beratung",
		isFullPageScreenshot: false,
	},

	// only offers from category "Freizeit"
	{ route: "/all-offers/?category=freizeit", isFullPageScreenshot: false },
	{ route: "/en/all-offers/?category=freizeit", isFullPageScreenshot: false },

	// only offers from category "Freizeit"
	{ route: "/all-offers/1_fc_union_berlin_ev/", isFullPageScreenshot: true },
	{ route: "/en/all-offers/1_fc_union_berlin_ev/", isFullPageScreenshot: true },

	// favorite offers page
	{ route: "/favorites/", isFullPageScreenshot: true },
	{ route: "/en/favorites/", isFullPageScreenshot: true },

	// map page
	{ route: "/map/", isFullPageScreenshot: true },
	{ route: "/en/map/", isFullPageScreenshot: true },

	// imprint page
	{ route: "/imprint/", isFullPageScreenshot: true },
	{ route: "/en/imprint/", isFullPageScreenshot: true },

	// privacy note page
	{ route: "/privacy-note/", isFullPageScreenshot: true },
	{ route: "/en/privacy-note/", isFullPageScreenshot: true },

	// about project page
	{ route: "/about-project/", isFullPageScreenshot: true },
	{ route: "/en/about-project/", isFullPageScreenshot: true },

	// accessibility statement page
	{ route: "/accessibility-statement/", isFullPageScreenshot: true },
	{ route: "/en/accessibility-statement/", isFullPageScreenshot: true },
];

test.beforeEach(async ({ context }) => {
	/**
	 * our tests trigger the ddos protection from berlin.de,
	 * therefore we just ignore content that gets loaded from
	 * their domains
	 */
	await context.route("**://www.berlin.de/**", (route) => route.abort());
});

for (const { route, isFullPageScreenshot } of routes) {
	test(`Visual regression for ${route}`, async ({ page }) => {
		await page.goto(route);
		await expect(page).toHaveScreenshot({ fullPage: isFullPageScreenshot });
	});
}
