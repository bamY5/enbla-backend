const MealThread = require("../model/mealModel");
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
	const { err, data } = await threadService.newThread(post, files, req.user);

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
	const { err, data } = await threadService.replyThread(
		post,
		files,
		req.user,
		threadId
	);

	if (err) {
		return next(new ErrorResponse("Operation Failed", 500));
	}

	res.status(200).json({
		success: true,
		data: data,
	});
};

exports.likeThread = async (req, res, next) => {
	const id = req.params.id;

	const thread = await MealThread.findByIdAndUpdate(
		id,
		{
			$push: { "public_metrices.likes": req.user.id },
			$inc: { "public_metrices.like_count": 1 },
		},
		{ new: true }
	);

	if (!thread) {
		return next(new ErrorResponse("Like operation failed", 400));
	}

	res.status(200).json({
		success: true,
		data: thread,
	});
};

exports.deleteThread = async (req, res, next) => {
	const id = req.params.id;

	const thread = await MealThread.findByIdAndDelete(id);

	if (!thread) {
		return next(new ErrorResponse("Delete operation failed", 400));
	}

	const replys = thread.public_metrices.replys;

	if (replys) {
		replys.map(async function (replyId) {
			try {
				await MealThread.findByIdAndDelete(replyId);
			} catch (e) {
				console.log(e);
				return next(new ErrorResponse("Delete Operation unsuccessful", 500));
			}
		});
	}

	res.status(200).json({
		success: true,
		data: thread,
	});
};
