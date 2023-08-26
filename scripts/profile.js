
const logOutBtn = document.getElementById("logoutBtn");
const pName = document.getElementById("profileName");
const pEmail = document.getElementById("profileEmail");
const pPassword = document.getElementById("profilePassword");


// Check if the user has an access token in localStorage.
function checkAccessToken() {
	if (localStorage.getItem("accessToken")) {
		// Redirect the user to the profile page.
		window.location.replace("profile.html");
	} else {
		// Redirect the user to the signup page.
		window.location.replace("index.html");
	}
}

document.addEventListener("DOMContentLoaded", () => {
	// Get the data from localStorage & Set the values to the profile page.
	pName.innerText = localStorage.getItem("name");
	pEmail.innerText = localStorage.getItem("email");
	pPassword.innerText = localStorage.getItem("password");
});

logOutBtn.addEventListener("click", () => {
	// Clear the localStorage data.
	localStorage.clear();
	// Show the signup page.
	checkAccessToken();
});