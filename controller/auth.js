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
	input.phone = req.body.phone;
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
		fullName: req.body.fullName,
		phone: req.body.phone,
		password: req.body.password,
	};

	const { error, statusCode, data } = await authService.registerUser(obj);

	if (error) {
		console.log(error)
		return next(new ErrorResponse(error, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		data,
	});
};
