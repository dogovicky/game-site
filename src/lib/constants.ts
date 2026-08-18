const apiKey = import.meta.env.VITE_RAWG_API_KEY;
const apiBaseUrl = import.meta.env.VITE_RAWG_API_BASE_URL ?? 'https://api.rawg.io/api/games';

export const API_URL = apiKey
	? `${apiBaseUrl}?key=${encodeURIComponent(apiKey)}`
	: apiBaseUrl;