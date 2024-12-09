export async function translateViaOpenAi(
	json: string,
	openAiApiKey: string,
): Promise<{
	provider: string;
	providerDescription: string;
	offerDescription: string;
	offerInformation: string;
}> {
	const response = await fetch("https://api.openai.com/v1/chat/completions", {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${openAiApiKey}`,
		},
		method: "POST",
		body: JSON.stringify({
			model: "gpt-4o-mini",
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
}
