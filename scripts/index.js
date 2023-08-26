// To revert it back to single page with hidden section. Uncomment line 3-7, 27,28, 34,35, 46-49 and comment out lines 30 & 37.
// if reverted back to single page, then it's safe to delete profile.js & profile.html

// const signupSec = document.getElementById("signUp");
// const profileSec = document.getElementById("profile");
// const pName = document.getElementById("profileName");
// const pEmail = document.getElementById("profileEmail");
// const pPassword = document.getElementById("profilePassword");

const signupForm = document.getElementById("signupForm");
const messageBox = document.getElementById("message");
const logOutBtn = document.getElementById("logoutBtn");

const accessToken = Math.random().toString(36).substring(7);



function errorMsg(message) {
	messageBox.className="error";
	messageBox.innerText=message;
}
function successMsg(message) {
	messageBox.className="success";
	messageBox.innerText=message;
}

function showProfile() {
	// signupSec.style.display = "none";
	// profileSec.style.display = "block";

	window.location.replace("profile.html");
}

function showSignup() {
	// signupSec.style.display = "block";
	// profileSec.style.display = "none";

	window.location.replace("index.html");
}


// Check if the user has an access token in localStorage.
function checkAccessToken() {
	if (localStorage.getItem("accessToken")) {
		// Redirect the user to the profile page.
		showProfile();
		// // Get the data from localStorage & Set the values to the profile page.
		// pName.innerText = localStorage.getItem("name");
		// pEmail.innerText = localStorage.getItem("email");
		// pPassword.innerText = localStorage.getItem("password");
	} else {
		// Redirect the user to the signup page.
		showSignup();
	}
}

// Main code.

signupForm.addEventListener("submit", (event) => {

	event.preventDefault();  // Prevent the form from submitting.

	// Get the values of the form inputs.
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const confPassword = document.getElementById("confPassword").value;

	// Validate form inputs.
	if (name === "" || email === "" || password === "" || confPassword === "") {
		errorMsg("All Fields are mandatory.");
		return;
	}

	const regexName = /^[a-zA-Z ]+$/;
	if (!regexName.test(name)) {
		errorMsg("The name must only contain letters and spaces.");
		return;
	}
	const spaceRegex = /\s/g;
	if (!spaceRegex.test(name)) {
		errorMsg("Please Enter Full Name.");
		return;
	}

	const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
	if (!regexEmail.test(email.toLowerCase())) {
		errorMsg("The email address is not valid.");
		return;
	}

	const regex = /^[a-zA-Z0-9.]+$/;
	if (password.length < 5 || password.length > 15) {
		errorMsg("The password must be 5-15 characters long.");
		return;
	}
	else if (!regex.test(password)) {
		errorMsg("The password must only contain letters, numbers, and `.`.");
		return;
	}

	if (confPassword !== password) {
		errorMsg("The passwords do not match.");
		return;
	}

	// Save the form data to localStorage.
	localStorage.setItem("name", name);
	localStorage.setItem("email", email);
	localStorage.setItem("password", password);
	localStorage.setItem("accessToken", accessToken);


	successMsg("Signup successful!");

	// Clear the form inputs.
	document.getElementById("name").value = "";
	document.getElementById("email").value = "";
	document.getElementById("password").value = "";
	document.getElementById("confPassword").value = "";

	// Check for AccessToken and redirect to profile page.
	checkAccessToken();
});


logOutBtn.addEventListener("click", () => {
	// Clear the localStorage data.
	localStorage.clear();
	// Show the signup page.
	showSignup();
});

window.onload = function () {
	checkAccessToken()
	if (!localStorage){
		window.alert("localStorage is not supported");
	}
}