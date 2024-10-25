// pokiList.js
import { capitalize } from "../lib/capitalize.js";
import fetchData from "../lib/fetchData.js";
import { pokiCardTemplate } from "../lib/templates/cardTemplate.js";

export const fetchAllPokemon = async () => {
	const preloaderContainer = document.getElementById("preloader-container");

	try {
		// Show preloader while fetching data
		preloaderContainer.style.display = "flex";

		// Fetch all Pokémon data and limit to 26 Pokémon
		const pokiList = await fetchData("pokemon");
		// pokiList = pokiList.slice(0, 26);

		// Add the template to the DOM
		const templateContainer = document.createElement("div");
		templateContainer.innerHTML = pokiCardTemplate;
		document.body.appendChild(templateContainer);

		// Render the cards and wait for all elements (images and cards) to load
		await renderCards(pokiList);

		// Hide the preloader after everything is rendered
		preloaderContainer.style.display = "none";
	} catch (error) {
		console.error("Error during Pokémon list initialization:", error);
		preloaderContainer.style.display = "none"; // Hide preloader even in case of an error
	}
};

// Renders Pokémon cards and waits for all images and card content to load
const renderCards = (pokis) => {
	const deckContainer = document.getElementById("poki-list");
	if (!deckContainer) return;

	// Create an array of promises that resolve when each card and image is fully loaded
	pokis.map(async ({ id, name }) => {
		const template = document.getElementById("poki-card-template").content;
		const pokiCard = document.importNode(template, true);

		// Populate the card with Pokémon data
		pokiCard.querySelector(".poki-number").textContent = id;
		pokiCard.querySelector(".poki-name").textContent = capitalize(name);
		const imageElement = pokiCard.querySelector(".poki-image");
		imageElement.src = `https://raw.githubusercontent.com/getmimo/things-api/main/files/pokedex/sprites/master/sprites/pokemon/${id}.png`;

		// Add click event listener to select the card
		const cardElement = pokiCard.querySelector(".poki-card");
		cardElement.addEventListener("click", () => {
			if (cardElement.classList.contains("selected")) {
				cardElement.classList.remove("selected");
			} else {
				cardElement.classList.add("selected");
				console.log("added");
			}
		});

		// Append the card to the deck
		deckContainer.appendChild(pokiCard);
	});
};

// Renders card color based on Pokémon type
// const renderCardColour = (pokiCard) => {
// 	const cardElement = pokiCard.querySelector(".poki-card");
// 	if (!cardElement) {
// 		console.error("Card element not found in the template!");
// 		return;
// 	}

// 	const typeColors = {
// 		bug: "--color-bug",
// 		dark: "--color-dark",
// 		dragon: "--color-dragon",
// 		electric: "--color-electric",
// 		fairy: "--color-fairy",
// 		fighting: "--color-fighting",
// 		fire: "--color-fire",
// 		flying: "--color-flying",
// 		ghost: "--color-ghost",
// 		grass: "--color-grass",
// 		ground: "--color-ground",
// 		ice: "--color-ice",
// 		normal: "--color-normal",
// 		poison: "--color-poison",
// 		psychic: "--color-psychic",
// 		rock: "--color-rock",
// 		steel: "--color-steel",
// 		water: "--color-water",
// 	};
// };
