'use strict';


var messages = {
	welcome: { en: "Welcome to Scout24 test API" },
	valid_email: { en: "Please enter a valid email." },
	password_specs: { en: "The password should has a minimum of 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces." },
	user_exist: { en: "User exists, try to login." },
	registered: { en: "Registered." },
	pass_not_match: { en: "Password does not match the confirm password." },
	provide_info: { en: "Provide the needed information to register." },
	auth_faild: { en: "Authentication failed. User not found." },
	logged: { en: "Welcome back!" },
	wrong_pass: { en: "Authentication failed. Wrong password." },
	token_valid: { en: "Your token is valid." },
	token_not_valid: { en: "This tokrn is not ours or yours." },
	token_new: { en: "New token." },
	no_user: { en: "No user found" },
	advert_created: { en: "Advert created successfully" },
	advert_deleted: { en: "Advert deleted successfully" },
	advert_updated: { en: "Advert updated successfully" },
	found_advert: { en: "Adverts list have been retrieved" },
	no_advert: { en: "No advert found" }
}

module.exports = function message(lang, message) {
	return messages[message][lang];
}