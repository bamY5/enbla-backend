var fs = require("fs");
const Liemat = require("../model/liematModel");
const ErrorResponse = require("../util/errorResponse");
const { singleUser } = require("../util/singleUser");

exports.getLiemat = async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 5;

	const liemat = await Liemat.find()
		.limit(limit)
		.skip((page - 1) * limit);

	res.json({
		success: true,
		count: liemat.length,
		data: liemat,
	});
};

exports.getLiematById = async (req, res, next) => {
	const id = req.params.id;

	const liemat = await Liemat.findById(id);

	res.json({
		success: true,
		data: liemat,
	});
};

exports.getByCreator = async (req, res, next) => {
	const creatorId = req.params.creatorId;
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 5;

	const liemat = await Liemat.find({ "creator.id": creatorId })
		.limit(limit)
		.skip((page - 1) * limit);

	res.json({
		success: true,
		data: liemat,
	});
};

exports.createLiemat = async (req, res, next) => {
	const userId = req.user.id;
	const user = await singleUser(userId);

	if (Object.keys(user).length === 0) {
		return next(new ErrorResponse("User not found", 400));
	}

	const data = {
		creator: user,
		phoneNumber: req.user.phone,
		place: req.body.place,
		time: req.body.time,
		joiners: [],
		title: req.body.title,
		description: req.body.description,
		numberOfJoiners: req.body.numberOfJoiners,
	};
	let liemat = await Liemat.create(data);

	if (!liemat) {
		return next(new ErrorResponse("Operation was unsuccessful"));
	}
	res.json({
		success: true,
		data: liemat,
	});
};

exports.joinLiemat = async (req, res, next) => {
	const id = req.params.id;
	const liemat = await Liemat.findById(id);

	if (!liemat) {
		return next(new ErrorResponse("Liemat not found", 400));
	}

	const updatedLiemat = await Liemat.findByIdAndUpdate(
		id,
		{ $push: { joiners: req.user.id }, $inc: { joined: 1 } },
		{ new: true }
	);

	if (!updatedLiemat) {
		return next(new ErrorResponse("Server error", 500));
	}
	res.status(200).json({
		success: true,
		data: updatedLiemat,
	});
};

exports.leaveLieamt = async (req, res, next) => {
	const id = req.params.id;

	const liemat = await Liemat.findOneAndUpdate(
		id,
		{ $pull: { joiners: req.user.id }, $inc: { joined: -1 } },
		{ new: true }
	);

	if (!liemat) {
		return next(new ErrorResponse("Liemat not found"), 400);
	}

	res.status(200).json({
		success: true,
		data: liemat,
	});
};

exports.deleteLiemat = async (req, res, next) => {
	const id = req.params.id;

	const liemat = await Liemat.findOneAndDelete(id);

	if (!liemat) {
		return next(new ErrorResponse("Liemat not found", 400));
	}

	res.status(200).json({
		success: true,
		data: liemat,
	});
};
