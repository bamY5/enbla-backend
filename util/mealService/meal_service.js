const path = require("path");
const MealThread = require("../../model/mealModel");
const fs = require("fs");
const { upload, deleteImage } = require("../fileUpload");

exports.getThread = async (page, limit) => {
	try {
		const threads = await MealThread.find()
			.populate("creator")
			.limit(limit)
			.skip((page - 1) * limit);

		return {
			err: null,
			statusCode: 200,
			data: threads,
		};
	} catch (error) {
		return {
			err: error.message,
			statusCode: 500,
			result: null,
		};
	}
};

exports.newThread = async (query, media, user) => {
	return await thread(query, media, false);
};

exports.replyThread = async (query, media, threadId) => {
	const { error, data } = await thread(query, media, true);

	if (error) {
		return {
			err: error.message,
			statusCode: 500,
			data: null,
		};
	}

	try {
		const originalThread = await MealThread.findByIdAndUpdate(
			threadId,
			{
				$push: { "public_metrices.replys": data.id },
				$inc: { "public_metrices.reply_count": 1 },
			},
			{ new: true }
		);

		return {
			err: null,
			statusCode: 200,
			data: originalThread,
		};
	} catch (error) {
		await MealThread.findByIdAndDelete(data.id);
		return {
			err: error.message,
			statusCode: 500,
			data: null,
		};
	}
};

exports.likeThread = async (id, userId) => {
	try {
		const thread = await MealThread.findByIdAndUpdate(
			id,
			{
				$push: { "public_metrices.likes": userId },
				$inc: { "public_metrices.like_count": 1 },
			},
			{ new: true }
		);
		return {
			err: null,
			statusCode: 200,
			data: thread,
		};
	} catch (error) {
		return {
			err: error.message,
			statusCode: 500,
			data: null,
		};
	}
};

exports.unlikeThread = async (id, userId) => {
	try {
		const thread = await MealThread.findByIdAndUpdate(
			id,
			{
				$pull: { "public_metrices.likes": userId },
				$inc: { "public_metrices.like_count": -1 },
			},
			{ new: true }
		);
		return {
			err: null,
			statusCode: 200,
			data: thread,
		};
	} catch (error) {
		return {
			err: error.message,
			statusCode: 500,
			data: null,
		};
	}
};

exports.deleteThread = async (id) => {
	try {
		const res = await MealThread.findById(id);

		//delete from cloudinary
		for (const media of res.media) {
			const { error, result } = await deleteImage(media.imageId);
			if (error) {
				return {
					err: error.message,
					statusCode: 500,
					data: null,
				};
			}
		}

		const thread = await MealThread.findByIdAndDelete(id);

		return {
			err: null,
			statusCode: 201,
			data: thread,
		};
	} catch (error) {
		return {
			err: error.message,
			statusCode: 500,
			data: null,
		};
	}
};

const thread = async (query, media, isReply) => {
	try {
		if (isReply) {
			query.is_reply = true;
		}

		let meal = await MealThread.create(query);

		const tempMedia = [];
		for (var prop in media) {
			let image = media[prop];
			const { error, result } = await upload(image, "meal");

			if (error) {
				await MealThread.findByIdAndDelete(meal.id);
				return {
					err: error.message,
					statusCode: 500,
					data: null,
				};
			}

			tempMedia.push({
				imageUrl: result.secure_url,
				imageId: result.public_id,
			});
		}
		meal = await MealThread.findByIdAndUpdate(
			meal.id,
			{
				$set: { media: tempMedia },
			},
			{ new: true }
		);

		return {
			err: null,
			statusCode: 200,
			data: meal,
		};
	} catch (error) {
		return {
			err: error.message,
			statusCode: 400,
			data: null,
		};
	}
};
