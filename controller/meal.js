const MealThread = require("../model/mealModel");
const { imageParser } = require("../util/imageParser");
const ErrorResponse = require("../util/errorResponse");
const { validate } = require("../util/validateMealInput");
const threadService = require("../util/mealService/meal_service");

exports.getThread = async (req, res, next) => {
	const threads = await MealThread.find();

	res.json({
		success: true,
		count: threads.length,
		data: threads,
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

	if (files) {
		post.media = [];
		for (var prop in files) {
			let image = files[prop];
			if (image.mimetype.startsWith("image")) {
				post.media.push(image.name);
			}
		}
	}
	const { err, data } = await threadService.newThread(post, files, false);

	if (err) {
		return next(new ErrorResponse("Operation Failed", 500));
	}

	res.status(200).json({
		success: true,
		data: data,
	});
};

exports.replyToThread = async (req, res, next) => {
	const threadId = req.params.id;
	const post = {};
	let meal;
	const { error, isValid } = validate(req.body);

	if (!isValid) {
		return next(new ErrorResponse(error, 400));
	}

	post.text = req.body.text;
	post.creator = req.user.id;
	const files = req.files;

	if (files) {
		post.media = [];
		for (var prop in files) {
			let image = files[prop];
			if (image.mimetype.startsWith("image")) {
				post.media.push(image.name);
			}
		}
	}
	const { err, data } = await threadService.replyThread(post, files, threadId);

	if (err) {
		return next(new ErrorResponse("Operation Failed", 500));
	}

	res.status(200).json({
		success: true,
		data: data,
	});
};
