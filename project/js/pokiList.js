import fetchData from "../lib/fetchData.js";
import { pokiCardTemplate } from "../lib/templates/cardTemplate.js";

export const fetchAllPokemon = async () => {
	try {
		// Fetch Pokémon data
		const pokiList = await fetchData("pokemon");
		console.log("Fetched pokiList:", pokiList);

		// Add the template to the DOM
		const templateContainer = document.createElement("div");
		templateContainer.innerHTML = pokiCardTemplate;
		document.body.appendChild(templateContainer);

		// Render the cards and wait for all elements (images and cards) to load
		await renderCards(pokiList);

		// Hide the preloader after everything is rendered
		console.log("All images and cards are loaded, preloader hidden.");
	} catch (error) {
		console.error("Error during Pokémon list initialization:", error);
	}
};

// Fetches Pokémon type data
const fetchPokiType = async (name) => {
	const pokiType = await fetchData(`pokemon/${name}`);
	return pokiType.types.map((type) => type.type.name);
};

// Renders Pokémon cards and waits for all images and card content to load
const renderCards = (pokis) => {
	const deckContainer = document.getElementById("poki-list");
	if (!deckContainer) return;

	// Create an array of promises that resolve when each card and image is fully loaded
	pokis.slice(0, 26).map(async ({ id, name }) => {
		const template = document.getElementById("poki-card-template").content;
		const pokiCard = document.importNode(template, true);
		console.log("Rendering card for:", id, name);

		// Fetch Pokémon types
		const types = await fetchPokiType(name);
		console.log("Fetched types for", name, ":", types);

		// Populate the card with Pokémon data
		pokiCard.querySelector(".poki-number").textContent = id;
		pokiCard.querySelector(".poki-name").textContent = name;
		const imageElement = pokiCard.querySelector(".poki-image");
		imageElement.src = `https://raw.githubusercontent.com/getmimo/things-api/main/files/pokedex/sprites/master/sprites/pokemon/${id}.png`;

		// Populate the types
		const typesContainer = pokiCard.querySelector(".poki-types");
		types.forEach((type) => {
			const typeSpan = document.createElement("span");
			typeSpan.textContent = type;
			typeSpan.classList.add("poki-type");
			typesContainer.appendChild(typeSpan);
		});

		// Update the card color based on Pokémon type
		renderCardColour(pokiCard, types[0]);

		// Append the card to the deck
		deckContainer.appendChild(pokiCard);
	});

	// Wait for all cards (including images and content) to finish loading
	return Promise.all(cardLoadPromises)
		.then(() => {
			console.log("All cards and images have been fully loaded.");
		})
		.catch((error) => {
			console.error("An error occurred while loading cards or images:", error);
		});
};

// Renders card color based on Pokémon type
const renderCardColour = (pokiCard, type) => {
	const cardElement = pokiCard.querySelector(".poki-card");
	if (!cardElement) {
		console.error("Card element not found in the template!");
		return;
	}

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

	if (typeColors[type]) {
		cardElement.style.backgroundColor = getComputedStyle(
			document.documentElement
		).getPropertyValue(typeColors[type]);
	} else {
		console.error(`Type "${type}" not found in the color mapping.`);
	}
};
