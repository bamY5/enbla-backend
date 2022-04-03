const path = require("path");
const MealThread = require("../../model/mealModel");
const fs = require("fs");

exports.newThread = async (query, media, user) => {
	return await thread(query, media, user, false);
};

exports.replyThread = async (query, media, threadId, user) => {
	const { error, data } = await thread(query, media, user, true);

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
			err: true,
			data: null,
		};
	}
	return {
		err: false,
		data: data,
	};
};

const thread = async (query, media, user, isReply) => {
	const result = {
		error: false,
		data: null,
	};

	if (isReply) {
		query.is_reply = true;
	}

	const meal = await MealThread.create(query);
	var i = 0;
	let dir = fs.mkdirSync(
		`${process.env.FILE_UPLOAD_PATH}/${user.username}/status/${meal.id}/photo`,
		{ recursive: true }
	);
	for (var prop in media) {
		let img = media[prop];
		console.log(dir);
		await img.mv(`${dir}/${meal.id}/photo/${meal.media[i]}`, async (err) => {
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
