const MealThread = require("../model/mealModel");
const ErrorResponse = require("../util/errorResponse");
const { validate } = require("../util/mealService/validateMealInput");
const threadService = require("../util/mealService/meal_service");

exports.getThread = async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 5;

	const { err, statusCode, data } = await threadService.getThread(page, limit);

	if (err) {
		return next(new ErrorResponse(err, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		count: data.length,
		data,
	});
};

exports.createThread = async (req, res, next) => {
	const post = {};
	let meal;
	const { error, isValid } = validate(req.body);

	if (!isValid) {
		return next(new ErrorResponse(error, 400));
	}

	post.text = req.body.text;
	post.creator = req.user.id;
	const files = req.files;

	const { err, statusCode, data } = await threadService.newThread(
		post,
		files,
		req.user
	);

	if (err) {
		return next(new ErrorResponse(err, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		data,
	});
};

exports.replyToThread = async (req, res, next) => {
	const threadId = req.params.id;
	const post = {};

	const { error, isValid } = validate(req.body);

	if (!isValid) {
		return next(new ErrorResponse(error, 400));
	}

	post.text = req.body.text;
	post.creator = req.user.id;
	const files = req.files;

	const { err, statusCode, data } = await threadService.replyThread(
		post,
		files,
		threadId,
		req.user
	);

	if (err) {
		return next(new ErrorResponse(err, statusCode));
	}

	res.status(200).json({
		success: true,
		data: data,
	});
};

exports.likeThread = async (req, res, next) => {
	const id = req.params.id;

	const { err, statusCode, data } = await threadService.likeThread(
		id,
		req.user.id
	);

	if (err) {
		return next(new ErrorResponse(err, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		data,
	});
};

exports.deleteThread = async (req, res, next) => {
	const id = req.params.id;
	const { err, statusCode, data } = await threadService.deleteThread(id);

	if (err) {
		return next(new ErrorResponse(err, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		data,
	});
};
