var fs = require("fs");
const Liemat = require("../model/liematModel");
const ErrorResponse = require("../util/errorResponse");
const ObjectID = require("mongodb").ObjectId;
const liematSevice = require("../util/liematService/liematService");

exports.getLiemat = async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 5;

	const { error, statusCode, data } = await liematSevice.getLiemat(page, limit);

	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}
	res.status(statusCode).json({
		success: true,
		count: data.length,
		data,
	});
};

exports.getLiematById = async (req, res, next) => {
	const id = req.params.id;

	const { error, statusCode, data } = await liematSevice.getLiematById(id);

	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		count: data.length,
		data,
	});
};

exports.getByCreator = async (req, res, next) => {
	const creatorId = req.params.id;
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 5;
	console.log(creatorId);
	const { error, statusCode, data } = await liematSevice.getByCreator(
		ObjectID(creatorId),
		page,
		limit
	);

	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		count: data.length,
		data,
	});
};

exports.createLiemat = async (req, res, next) => {
	const userId = req.user.id;

	const input = {
		creator: ObjectID(userId),
		phoneNumber: req.user.phone,
		place: req.body.place,
		time: req.body.time,
		joiners: [],
		title: req.body.title,
		description: req.body.description,
		numberOfJoiners: req.body.numberOfJoiners,
	};
	const { error, statusCode, data } = await liematSevice.createLiemat(input);

	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}
	res.status(statusCode).json({
		success: true,
		data,
	});
};

exports.joinLiemat = async (req, res, next) => {
	const id = req.params.id;

	const { error, statusCode, data } = await liematSevice.joinLiemat(
		id,
		ObjectID(req.user.id)
	);

	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		data,
	});
};

exports.leaveLieamt = async (req, res, next) => {
	const id = req.params.id;

	const { error, statusCode, data } = await liematSevice.leaveLieamt(
		id,
		ObjectID(req.user.id)
	);

	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		data,
	});
};

exports.deleteLiemat = async (req, res, next) => {
	const id = req.params.id;

	const { error, statusCode, data } = await liematSevice.deleteLiemat(id);

	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		data,
	});
};
