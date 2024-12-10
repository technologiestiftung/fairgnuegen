export async function translateViaOpenAi(
	json: string,
	openAiApiKey: string,
): Promise<{
	provider: string;
	providerDescription: string;
	offerDescription: string;
	offerInformation: string;
}> {
	try {
		const response = await fetch("https://api.openai.com/v1/chat/completions", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${openAiApiKey}`,
			},
			method: "POST",
			body: JSON.stringify({
				model: "gpt-4o-mini",
				// https://platform.openai.com/docs/api-reference/chat
				// seed feature is in Beta. If specified, our system will make a best effort to
				// sample deterministically, such that repeated requests with the same seed and
				// parameters should return the same result. Determinism is not guaranteed.
				seed: 1024,
				messages: [
					{
						role: "system",
						content:
							"Translate the following json to English and only return json as response, DO NOT use semicolons.",
					},
					{
						role: "user",
						content: json,
					},
				],
			}),
		});

		const body = await response.json();

		const translation = JSON.parse(body.choices[0].message.content);
		return translation;
	} catch (e) {
		console.error(e);
		throw new Error(`Error translating data for ${json}`);
	}
}
