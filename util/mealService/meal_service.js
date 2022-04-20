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

	let meal = await MealThread.create(query);
	var i = 0;

	if (
		!fs.exists(
			path.join(
				__dirname,
				`${process.env.FILE_UPLOAD_PATH}/${user.username}/status/photo`
			),
			(exists) => {
				exists ? true : false;
			}
		)
	) {
		fs.mkdirSync(
			`${process.env.FILE_UPLOAD_PATH}/${user.username}/status/photo`,
			{ recursive: true }
		);
	}

	let dir = fs.mkdirSync(
		`${process.env.FILE_UPLOAD_PATH}/${user.username}/status/photo/${meal.id}`,
		{ recursive: true }
	);

	const tempMedia = [];
	for (var prop in media) {
		let img = media[prop];

		await img.mv(`${dir}/${meal.media[i]["filename"]}`, async (err) => {
			if (err) {
				await MealThread.findOneAndDelete(meal.id);
				return {
					err: true,
					data: null,
				};
			}
		});

		tempMedia.push({
			filepath: `/uploads/${user.username}/status/photo/${meal.id}`,
			filename: meal.media[i].filename,
		});
		i++;
	}
	meal = await MealThread.findByIdAndUpdate(
		meal.id,
		{
			$set: { media: tempMedia },
		},
		{ new: true }
	);

	return {
		err: false,
		data: meal,
	};
};
