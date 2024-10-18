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

	pokis.slice(0, 26).forEach(async ({ id, name }) => {
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
		// console.log(types[0]);
		// console.log(pokiCard);
		renderCardColour(pokiCard, types[0]);
		// Append the card to the deck
		deckContainer.appendChild(pokiCard);
	});
};

const renderCardColour = (pokiCard, type) => {
	// Select the actual card element inside the pokiCard (DocumentFragment)
	const cardElement = pokiCard.querySelector(".poki-card");

	// Ensure cardElement exists before trying to add the class
	if (!cardElement) {
		console.error("Card element not found in the template!");
		return;
	}

	// Dynamically apply the background color using CSS variables
	const typeColors = {
		bug: "--color-bug",
		dark: "--color-dark",
		dragon: "--color-dragon",
		electric: "--color-electric",
		fairy: "--color-fairy",
		fighting: "--color-fighting",
		fire: "--color-fire",
		flying: "--color-flying",
		ghost: "--color-ghost",
		grass: "--color-grass",
		ground: "--color-ground",
		ice: "--color-ice",
		normal: "--color-normal",
		poison: "--color-poison",
		psychic: "--color-psychic",
		rock: "--color-rock",
		steel: "--color-steel",
		water: "--color-water",
	};

	// Check if the type exists in the typeColors map
	if (typeColors[type]) {
		// console.log(typeColors[type]);
		// Apply the corresponding CSS variable as the background color
		cardElement.style.backgroundColor = getComputedStyle(
			document.documentElement
		).getPropertyValue(typeColors[type]);
	} else {
		console.error(`Type "${type}" not found in the color mapping.`);
	}
};
