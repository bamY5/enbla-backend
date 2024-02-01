const validator = require("validator");
const isEmpty = require("../isEmpty");

exports.signin = (obj) => {
	const errors = {};

	if (validator.isEmpty(obj.phone)) {
		errors.phone = "Phone is required";
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

	obj.firstName = !isEmpty(obj.firstname) ? obj.fullName : "";
	obj.phone = !isEmpty(obj.phone) ? obj.phone : "";
	obj.password = !isEmpty(obj.password) ? obj.password : "";

	if (validator.isEmpty(obj.fullName)) errors.name = "Fullname is required";
	else if (!validator.isLength(obj.fullName, { min: 2, max: 30 }))
		errors.firstname = "Fullname should be between 2 and 30 character long";
	if (validator.isEmpty(obj.phone)) errors.phone = "phone is required";

	if (validator.isEmpty(obj.password)) errors.password = "password is required";

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
