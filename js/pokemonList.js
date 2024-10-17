import fetchData from "../lib/fetchData.js";
import { pokemonCardTemplate } from "../lib/templates/cardTemplate.js";
// import { pokemonCardTemplate } from "./pokemonTemplate.js"; // Import the template

export const initPokemonDeck = async () => {
	const pokemonList = await fetchData("pokemon");

	if (!pokemonList) return console.log("the fetched data is empty");

	// Add the template to the DOM
	const templateContainer = document.createElement("div");
	templateContainer.innerHTML = pokemonCardTemplate;
	document.body.appendChild(templateContainer);

	renderCards(pokemonList);
};

const renderCards = (pokemons) => {
	const deckContainer = document.getElementById("pokemon-deck");
	if (!deckContainer) return;

	pokemons.forEach((pokemon) => {
		const template = document.getElementById("pokemon-card-template").content;
		const pokemonCard = document.importNode(template, true);

		// Populate the card with pokemon data
		pokemonCard.querySelector(".pokemon-name").textContent = pokemon.name;
		pokemonCard.querySelector(".pokemon-image").src = pokemon.imageUrl; // Assuming `imageUrl` exists in your data
		pokemonCard.querySelector(".pokemon-type").textContent = pokemon.type;

		// Append the card to the deck
		deckContainer.appendChild(pokemonCard);
	});
};
