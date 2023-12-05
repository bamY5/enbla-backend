const User = require("../model/userModel");
const ErrorResponse = require("../util/errorResponse");
const matchUser = require("../util/matchUser");
const isValidateProfile = require("../util/userService/validateProfile");
const userService = require("../util/userService/userService");
const isEmpty = require("../util/isEmpty");

exports.getUser = async (req, res, next) => {
	const id = req.user.id;
	const { error, statusCode, data } = await userService.getUserProfile(id);

	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		data,
	});
};

exports.getUsers = async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 5;

	const { error, statusCode, data } = await userService.getUsers(page, limit);
	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		count: data.length,
		data,
	});
};

// exports.getUserByUsername = async (req, res, next) => {
// 	if (isEmpty(req.body.username)) {
// 		return next(new ErrorResponse("Username is Reuired", 400));
// 	}

// 	const { error, statusCode, data } = await userService.getUserByUsername(
// 		req.body.username
// 	);

// 	if (error) {
// 		return next(new ErrorResponse(error, statusCode));
// 	}

// 	res.status(statusCode).json({
// 		success: true,
// 		data,
// 	});
// };

exports.updateUser = async (req, res, next) => {
	const id = req.params.id;
	const userFields = {};

	const { errors, isValid } = isValidateProfile(req.body);

	if (!isValid) {
		return next(new ErrorResponse(errors, 400));
	}

	if (req.body.fullName) userFields.firstname = req.body.fullName;

	if (req.body.email) userFields.email = req.body.email;

	if (req.body.bio) userFields.bio = req.body.bio;

	// Social profiles
	userFields.social_profile = {};

	if (req.body.twitter) userFields.social_profile.twitter = req.body.twitter;

	if (req.body.facebook) userFields.social_profile.facebook = req.body.facebook;

	if (req.body.instagram)
		userFields.social_profile.instagram = req.body.instagram;

	const { error, statusCode, data } = await userService.updateUser(
		id,
		userFields
	);

	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		data,
	});
};

exports.uploadProfile = async (req, res, next) => {
	const id = req.params.id;

	const files = req.files;
	if (!files) {
		return next(new ErrorResponse("image not found", 400));
	}
	const { error, statusCode, data } = await userService.uploadProfile(
		id,
		files
	);

	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		data,
	});
};

exports.followUser = async (req, res, next) => {
	const id = req.params.id;

	const { error, statusCode, data } = await userService.followUser(
		req.user.id,
		id
	);

	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		data,
	});
};

exports.unfollowUser = async (req, res, next) => {
	const id = req.params.id;

	const { error, statusCode, data } = await userService.unfollowUser(
		req.user.id,
		id
	);

	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		data,
	});
};
