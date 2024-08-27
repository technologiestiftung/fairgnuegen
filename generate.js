import fs from "node:fs";
import * as nodePath from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = nodePath.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => nodePath.resolve(__dirname, p);

/**
 * The following files are missing at the beginning
 * because they are generated during the build step.
 */
const template = fs.readFileSync(toAbsolute("dist/index.html"), "utf-8");
const { render } = await import("./dist/server/entry-server.js");
const { routes } = await import("./dist/assets/routes/routes.js");
const { content } = await import("./dist/assets/content/content.js");

function generateStaticPages() {
	for (const { path } of routes) {
		// eslint-disable-next-line no-console
		console.log("path:", path);

		const appHtml = render(path);
		const pageTitle = content[path].title;

		const html = template
			.replace("<title></title>", `<title>${pageTitle}</title>`)
			.replace(`<!--app-html-->`, appHtml);

		const filePath = `dist${path}index.html`;
		writeFileSyncRecursive(toAbsolute(filePath), html);

		// eslint-disable-next-line no-console
		console.log("pre-rendered:", filePath);
	}
}

function writeFileSyncRecursive(filename, html) {
	const dirname = nodePath.dirname(filename);

	// Check if the directory exists
	if (!fs.existsSync(dirname)) {
		// If not, create the directory recursively
		fs.mkdirSync(dirname, { recursive: true });
	}

	// Write the file
	fs.writeFileSync(filename, html);
}

generateStaticPages();
