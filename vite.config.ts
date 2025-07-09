import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import babel from "vite-plugin-babel";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer],
		},
	},
	build: {
		target: "es2015",
		rollupOptions: {
			plugins: [
				babel({
					babelConfig: {
						plugins: ["@babel/plugin-transform-unicode-property-regex"],
					},
					filter: /\.(js|ts|jsx|tsx)$/,
				}),
			],
		},
	},
	plugins: [
		reactRouter(),
		tsconfigPaths(),
		legacy({
			targets: ["ie >= 11"],
			renderLegacyChunks: true,
			modernPolyfills: false,
			additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
		}),
	],
});
