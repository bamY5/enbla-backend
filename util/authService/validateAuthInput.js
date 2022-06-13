const validator = require("validator");
const isEmpty = require("../isEmpty");

exports.signin = (obj) => {
	const errors = {};

	if (validator.isEmpty(obj.username)) {
		errors.username = "Username is required";
	}

	if (validator.isEmpty(obj.password)) {
		errors.password = "Password is required";
	}

	return {
		err: errors,
		isValid: isEmpty(errors),
	};
};

exports.register = (obj) => {
	const errors = {};

	obj.firstname = !isEmpty(obj.firstname) ? obj.firstname : "";
	obj.lastname = !isEmpty(obj.lastname) ? obj.lastname : "";
	obj.email = !isEmpty(obj.email) ? obj.email : "";
	obj.username = !isEmpty(obj.username) ? obj.username : "";
	obj.birthday = !isEmpty(obj.birthday) ? obj.birthday : "";
	obj.phone = !isEmpty(obj.phone) ? obj.phone : "";
	obj.password = !isEmpty(obj.password) ? obj.password : "";

	if (validator.isEmpty(obj.firstname)) errors.name = "Firstname is required";
	else if (!validator.isLength(obj.firstname, { min: 2, max: 30 }))
		errors.firstname = "Firstname should be between 2 and 30 character long";

	if (validator.isEmpty(obj.lastname))
		errors.lastname = "Firstlastname is required";
	else if (!validator.isLength(obj.lastname, { min: 2, max: 30 }))
		errors.lastname = "Firstname should be between 2 and 30 character long";

	if (validator.isEmpty(obj.email)) errors.email = "Email is required";
	else if (!validator.isEmail(obj.email)) errors.email = "Invalid Email";

	if (validator.isEmpty(obj.username)) errors.username = "username is required";

	if (validator.isEmpty(obj.birthday)) errors.birthday = "birthday is required";

	if (validator.isEmpty(obj.phone)) errors.phone = "phone is required";

	if (validator.isEmpty(obj.password)) errors.password = "password is required";

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
