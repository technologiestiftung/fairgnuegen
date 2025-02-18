/* eslint-disable no-console */
import { backOff } from "exponential-backoff";
import { type ApiRow } from "./utils";

export async function fetchPaginatedData(
	page: number,
	accumulatedData: ApiRow[] | null,
): Promise<ApiRow[]> {
	if (!process.env.FREE_DB_USERNAME || process.env.FREE_DB_USERNAME === "") {
		throw new Error("env FREE_DB_USERNAME must be defined");
	}

	if (!process.env.FREE_DB_PASSWORD || process.env.FREE_DB_PASSWORD === "") {
		throw new Error("env FREE_DB_PASSWORD must be defined");
	}

	if (!process.env.FREE_DB_URL || process.env.FREE_DB_URL === "") {
		throw new Error("env FREE_DB_URL must be defined");
	}

	const url = `${process.env.FREE_DB_URL}?page=${page}&ipp=500`;

	console.info(`fetching: [${url}]`);

	const username = process.env.FREE_DB_USERNAME;
	const password = process.env.FREE_DB_PASSWORD;

	let response = await fetch(url, {
		headers: {
			Authorization:
				"Basic " + Buffer.from(username + ":" + password).toString("base64"),
			page: page.toString(),
		},
	});

	if (response.status === 425) {
		response = await backOff(async () => {
			const newResponse = await fetch(url, {
				headers: {
					Authorization:
						"Basic " +
						Buffer.from(username + ":" + password).toString("base64"),
				},
			});
			if (!newResponse.ok) {
				throw new Error("API is blocking the request due to rate limiting...");
			}
			return newResponse;
		});
	}

	const jsonData = await response.json();
	const data = jsonData.data.index as ApiRow[];

	if (data.length === 0) {
		return accumulatedData || [];
	}

	const newAccumulatedData = accumulatedData
		? accumulatedData.concat(data)
		: data;

	return fetchPaginatedData(page + 1, newAccumulatedData);
}
