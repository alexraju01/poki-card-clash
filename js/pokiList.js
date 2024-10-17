import fetchData from "../lib/fetchData.js";
import { pokiCardTemplate } from "../lib/templates/cardTemplate.js";

export const initPokiDeck = async () => {
	const pokiList = await fetchData("pokemon");
	console.log(pokiList);
	if (!pokiList) return console.log("the fetched data is empty");

	// Add the template to the DOM
	const templateContainer = document.createElement("div");
	templateContainer.innerHTML = pokiCardTemplate;
	document.body.appendChild(templateContainer);

	renderCards(pokiList);
};

const renderCards = (pokis) => {
	const deckContainer = document.getElementById("poki-deck");
	if (!deckContainer) return;

	pokis.slice(0, 5).forEach(({ id, name }) => {
		const template = document.getElementById("poki-card-template").content;
		const pokiCard = document.importNode(template, true);

		// Populate the card with pokemon data
		pokiCard.querySelector(".poki-name").textContent = name;
		pokiCard.querySelector(
			".poki-image"
		).src = `https://raw.githubusercontent.com/getmimo/things-api/main/files/pokedex/sprites/master/sprites/pokemon/${id}.png`; // Assuming `imageUrl` exists in your data

		// Append the card to the deck
		deckContainer.appendChild(pokiCard);
	});
};
