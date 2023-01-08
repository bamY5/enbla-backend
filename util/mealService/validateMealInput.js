const validator = require("validator");
const isEmpty = require("../isEmpty");

exports.validate = (data) => {
	const errors = {};

	const text = !isEmpty(data.text) ? data.text : "";
	const event_id = data.event_id || "";

	if (validator.isEmpty(text)) {
		errors.text = "Text required";
	} else if (!validator.isLength(text, { min: 0, max: 150 })) {
		errors.text = "Text should be less than 150 characters";
	} else if (validator.isEmpty(event_id)) {
		errors.event_id = "Event is required";
	}

	return {
		error: errors,
		isValid: isEmpty(errors),
	};
};
