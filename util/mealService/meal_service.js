const path = require("path");
const MealThread = require("../../model/mealModel");

exports.newThread = async (query, media) => {
	return await thread(query, media, false);
};

exports.replyThread = async (query, media, threadId) => {
	const { error, data } = await thread(query, media, true);

	if (error) {
		return {
			err: true,
			data: null,
		};
	}

	const originalThread = await MealThread.findByIdAndUpdate(threadId, {
		$push: { "public_metrices.replys": data.id },
		$inc: { "public_metrices.reply_count": 1 },
	});

	if (!originalThread) {
		await MealThread.findByIdAndDelete(data.id);
		return {
			err: false,
			data: null,
		};
	}
	return {
		err: false,
		data: data,
	};
};

const thread = async (query, media, isReply) => {
	const result = {
		error: false,
		data: null,
	};

	if (isReply) {
		query.is_reply = true;
	}

	const meal = await MealThread.create(query);
	var i = 0;
	for (var prop in media) {
		let img = media[prop];
		img.mv(`${process.env.FILE_UPLOAD_PATH}/${meal.media[i]}`, async (err) => {
			if (err) {
				await MealThread.findOneAndDelete(meal.id);
				return {
					err: true,
					data: null,
				};
			}
		});
		i++;
	}

	return {
		err: false,
		data: meal,
	};
};
