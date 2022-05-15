const Liemat = require("../../model/liematModel");
const { singleUser } = require("../singleUser");

exports.getLiemat = async (page, limit) => {
	try {
		const liemat = await Liemat.find()
			.limit(limit)
			.skip((page - 1) * limit);

		return {
			error: null,
			statusCode: 200,
			data: liemat || [],
		};
	} catch (error) {
		return {
			error,
			statusCode: 400,
			data: null,
		};
	}
};

exports.getLiematById = async (id) => {
	try {
		const liemat = await Liemat.findById(id);

		return {
			error: null,
			statusCode: 200,
			data: liemat || [],
		};
	} catch (error) {
		return {
			error,
			statusCode: 400,
			data: null,
		};
	}
};

exports.getByCreator = async (creatorId, page, limit) => {
	try {
		const liemat = await Liemat.find({ "creator.id": creatorId })
			.limit(limit)
			.skip((page - 1) * limit);

		return {
			error: null,
			statusCode: 200,
			data: liemat || [],
		};
	} catch (error) {
		return {
			error,
			statusCode: 400,
			data: null,
		};
	}
};

exports.createLiemat = async (userId, obj) => {
	try {
		const user = await singleUser(userId);

		obj.creator = user;
		const liemat = await Liemat.create(obj);

		return {
			error: null,
			statusCode: 200,
			data: liemat,
		};
	} catch (error) {
		return {
			error,
			statusCode: 400,
			data: null,
		};
	}
};

exports.joinLiemat = async (id, userId) => {
	try {
		const updatedLiemat = await Liemat.findByIdAndUpdate(
			id,
			{ $push: { joiners: userId }, $inc: { joined: 1 } },
			{ new: true }
		);

		return {
			error: null,
			statusCode: 201,
			data: updatedLiemat,
		};
	} catch (error) {
		return {
			error,
			statusCode: 400,
			data: null,
		};
	}
};

exports.leaveLieamt = async (id, userId) => {
	try {
		const liemat = await Liemat.findByIdAndUpdate(
			id,
			{ $pull: { joiners: userId }, $inc: { joined: -1 } },
			{ new: true }
		);

		return {
			error: null,
			statusCode: 201,
			data: liemat,
		};
	} catch (error) {
		return {
			error,
			statusCode: 400,
			data: null,
		};
	}
};

exports.deleteLiemat = async (id) => {
	try {
		const liemat = await Liemat.findOneAndDelete(id);
		return {
			error: null,
			statusCode: 200,
			data: "Liemat successfully deleted",
		};
	} catch (error) {
		return {
			error,
			statusCode: 400,
			data: null,
		};
	}
};
