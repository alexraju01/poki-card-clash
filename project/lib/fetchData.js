// fetchData.js

export const fetchData = async (endpoint) => {
	try {
		const response = await fetch(`https://pokedex.mimo.dev/api/${endpoint}`);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error(`Error fetching data from ${endpoint}:`, error);
		return null;
	}
};

export default fetchData;
