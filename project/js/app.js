import { fetchAllPokemon } from "./pokiList.js";

document.addEventListener("DOMContentLoaded", function () {
	const loginForm = document.getElementById("login-form");
	const usernameInput = document.getElementById("username");
	const errorMessage = document.getElementById("error-message");

	if (loginForm) {
		loginForm.addEventListener("submit", function (e) {
			e.preventDefault();
			const username = usernameInput.value.trim();
			if (username) {
				localStorage.setItem("username", username);
				window.location.href = "pokiList.html"; // Navigate to Pokémon page
			} else {
				errorMessage.textContent = "Please enter a valid username.";
			}
		});
	}
});

fetchAllPokemon();
