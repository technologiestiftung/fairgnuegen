/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @technologiestiftung/no-default-export
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		colors: {
			"primary-blue": "#132458",
			"primary-red": "#E40422",
			"focus-blue": "#176fc1",
			"link-blue": "#1049cc",
			white: "#ffffff",
			culture: "#0396b7",
			sport: "#96b223",
			education: "#fcc832",
			leisure: "#EC7AA0",
			separator: "#dddddd",
		},
	},
	plugins: [],
};
