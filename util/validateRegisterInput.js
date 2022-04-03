const validator = require("validator");
const isEmpty = require("../util/isEmpty");

const validateInput = (obj) => {
	const errors = {};

	obj.name = !isEmpty(obj.name) ? obj.name : "";
	obj.email = !isEmpty(obj.email) ? obj.email : "";
	obj.username = !isEmpty(obj.username) ? obj.username : "";
	obj.birthday = !isEmpty(obj.birthday) ? obj.birthday : "";
	obj.phone = !isEmpty(obj.phone) ? obj.phone : "";
	obj.password = !isEmpty(obj.password) ? obj.password : "";

	if (validator.isEmpty(obj.name)) errors.name = "Name is required";
	else if (!validator.isLength(obj.name, { min: 2, max: 30 }))
		errors.name = "Name should be between 2 and 30 character long";

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

module.exports = validateInput;
