const validator = require("validator");
const isEmpty = require("../util/isEmpty");

const isValidateProfile = (data) => {
	const errors = {};

	data.name = !isEmpty(data.name) ? data.name : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.bio = !isEmpty(data.bio) ? data.bio : "";
	data.twitter = !isEmpty(data.twitter) ? data.twitter : "";
	data.facebook = !isEmpty(data.facebook) ? data.facebook : "";
	data.instagram = !isEmpty(data.instagram) ? data.instagram : "";

	if (validator.isEmpty(data.name)) errors.name = "Name is required";
	else if (!validator.isLength(data.name, { min: 2, max: 30 }))
		errors.name = "Name should be between 2 and 30 character long";

	if (validator.isEmpty(data.email)) errors.email = "Email is required";
	else if (!validator.isEmail(data.email)) errors.email = "Invalid Email";

	if (!validator.isLength(data.bio, { min: 0, max: 200 }))
		errors.bio = "Bio must be less than 200 character";

	if (!validator.isEmpty(data.twitter)) {
		if (!validator.isURL(data.twitter)) {
			errors.twitter = "Not a valid URL";
		}
	}
	if (!validator.isEmpty(data.facebook)) {
		if (!validator.isURL(data.facebook)) {
			errors.twitter = "Not a valid URL";
		}
	}
	if (!validator.isEmpty(data.instagram)) {
		if (!validator.isURL(data.instagram)) {
			errors.twitter = "Not a valid URL";
		}
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};

module.exports = isValidateProfile;
