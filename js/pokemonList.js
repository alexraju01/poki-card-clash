fetch("https://pokedex.mimo.dev/api/pokemon")
	.then((res) => res.json())
	.then((json) => {
		// Call the function to render the Pokémon list
		renderPokemonDeck(json);
	})
	.catch((error) => console.error("Error fetching Pokémon data:", error));

// Function to render the Pokémon deck
function renderPokemonDeck(pokemonList) {
    
}
