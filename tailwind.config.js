/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @technologiestiftung/no-default-export
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	// https://github.com/tailwindlabs/tailwindcss/pull/8394
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		fontFamily: {
			sans: "Arial, sans-serif",
		},
		extend: {
			colors: {
				"primary-blue": "#132458",
				"primary-red": "#E40422",
				"focus-blue": "#176fc1",
				"link-blue": "#1049cc",
				culture: "#0396b7",
				sport: "#96b223",
				education: "#fcc832",
				leisure: "#EC7AA0",
				separator: "#dddddd",
				"berlin-grey": "#777777",
				"berlin-grey-dark": "#545454",
				"berlin-grey-light": "#f5f5f5", // neutral-100
				"berlin-grey-medium": "#d9d9d9",
				"berlin-pink": "#F5B4CB", // fuchsia-300
				"berlin-green": "#67B18D", // emerald-400
				"berlin-light-green": "#E2F1EB",
			},
			screens: {
				desktop: "1181px",
			},
			boxShadow: {
				default: "0 0 5px 1px rgba(23, 111, 193, 0.3)",
				"default-black": "0 0 5px 1px rgba(0, 0, 0, 0.25)",
			},
		},
	},
	plugins: [],
};
