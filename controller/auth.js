const User = require("../model/userModel");
const ErrorResponse = require("../util/errorResponse");
const validateInput = require("../util/authService/validateAuthInput");
const authService = require("../util/authService/authService");

exports.signin = async (req, res, next) => {
	const { err, isValid } = validateInput.signin(req.body);

	if (!isValid) {
		return next(new ErrorResponse(err, 400));
	}
	const input = {};
	input.username = req.body.username;
	input.password = req.body.password;

	const { error, statusCode, data } = await authService.signIn(input);

	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		data,
	});
};

exports.register = async (req, res, next) => {
	const { err, isValid } = validateInput.register(req.body);
	if (!isValid) {
		return next(new ErrorResponse(err, 400));
	}

	const obj = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		username: req.body.username,
		phone: req.body.phone,
		password: req.body.password,
		email: req.body.email,
		birthday: req.body.birthday || "",
	};

	const { error, statusCode, data } = await authService.registerUser(obj);

	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		data,
	});
};
