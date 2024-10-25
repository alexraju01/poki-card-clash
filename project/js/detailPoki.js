// detailPoki.js
console.log("hello ");
// Function to retrieve query parameters
function getQueryParam(param) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(param);
}

// Get the Pokémon name from the URL
const pokiName = getQueryParam("name");

// Display the Pokémon name on the page
document.getElementById("poki-name").textContent = pokiName;

// Optionally, you can fetch more details using the Pokémon name
// Example: Fetching Pokémon image and details based on the name
fetch(`https://pokeapi.co/api/v2/pokemon/${pokiName}`)
	.then((response) => response.json())
	.then((pokemonData) => {
		const pokiImageElement = document.getElementById("poki-image");
		pokiImageElement.src = pokemonData.sprites.front_default;
		// You can add more details to the page from pokemonData
	})
	.catch((error) => console.error("Error fetching Pokémon details:", error));
