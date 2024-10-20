export const fetchData = async (endpoint) => {
	try {
		const response = await fetch(`https://pokedex.mimo.dev/api/${endpoint}`);
		// Check if the response is successful
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		// Parse the response as JSON
		const data = await response.json();
		return data;
	} catch (error) {
		// Handle errors and log them
		console.error(`Error fetching data from ${endpoint}:`, error);
		return null; // Return null in case of error
	}
};

export default fetchData;
