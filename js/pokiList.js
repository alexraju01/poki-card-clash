// pokiList.js
import fetchData from "../lib/fetchData.js";
import { pokiCardTemplate } from "../lib/templates/cardTemplate.js";

export const initPokiList = async () => {
	const pokiList = await fetchData("pokemon");
	console.log(pokiList);
	if (!pokiList) return console.log("the fetched data is empty");

	// Add the template to the DOM
	const templateContainer = document.createElement("div");
	templateContainer.innerHTML = pokiCardTemplate;
	document.body.appendChild(templateContainer);

	renderCards(pokiList);
};

const fetchPokiType = async (name) => {
	const pokiType = await fetchData(`pokemon/${name}`);
	return pokiType.types.map((type) => type.type.name);
};

const renderCards = (pokis) => {
	const deckContainer = document.getElementById("poki-list");
	if (!deckContainer) return;

	pokis.slice(0, 5).forEach(async ({ id, name }) => {
		const template = document.getElementById("poki-card-template").content;
		const pokiCard = document.importNode(template, true);

		const types = await fetchPokiType(name);
		console.log(types);
		// const typeText = types.join(" ");

		// Populate the card with pokemon data
		pokiCard.querySelector(".poki-number").textContent = id;
		pokiCard.querySelector(".poki-name").textContent = name;
		pokiCard.querySelector(
			".poki-image"
		).src = `https://raw.githubusercontent.com/getmimo/things-api/main/files/pokedex/sprites/master/sprites/pokemon/${id}.png`; // Assuming `imageUrl` exists in your data
		const typesContainer = pokiCard.querySelector(".poki-types"); // Assuming .poki-types is the container for types
		types.forEach((type) => {
			const typeSpan = document.createElement("span");
			typeSpan.textContent = type;
			typeSpan.classList.add("poki-type"); // Optionally, add a class for styling
			typesContainer.appendChild(typeSpan);
		});
		// Append the card to the deck
		deckContainer.appendChild(pokiCard);
	});
};
