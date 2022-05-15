const User = require("../../model/userModel");
const { upload, deleteImage } = require("../fileUpload");
const { singleUser } = require("../singleUser");

exports.getUserById = async (id) => {
	try {
		let user = await User.findById(id);

		if (!user) {
			return {
				error: "User not found",
				statusCode: 400,
				data: null,
			};
		}

		user = await singleUser(user.id);

		return {
			error: null,
			statusCode: 200,
			data: user,
		};
	} catch (error) {
		return {
			error,
			statusCode: 400,
			data: null,
		};
	}
};

exports.updateUser = async (id, obj) => {
	try {
		const user = await User.findByIdAndUpdate(id, obj, { new: true });

		if (!user) {
			return {
				error: "User not found",
				statusCode: 401,
				data: null,
			};
		}

		return {
			error: null,
			statusCode: 201,
			data: user,
		};
	} catch (error) {
		return {
			error,
			statusCode: 400,
			data: null,
		};
	}
};

exports.uploadProfile = async (id, media) => {
	try {
		let user = await User.findById(id);
		if (!user) {
			return {
				error: "User not found",
				statusCode: 401,
				data: null,
			};
		}

		const { error, result } = await upload(media.profile, "profile");
		if (error) {
			return { error, statusCode: 500, data: null };
		}

		if (JSON.stringify(user.profile_image) !== "{}") {
			const res = await deleteImage(user.profile_image.imageId);

			if (res.error) {
				return { error: res.error, statusCode: 500, data: null };
			}
		}

		user = await User.findByIdAndUpdate(
			id,
			{
				$set: {
					"profile_image.imageUrl": result.secure_url,
					"profile_image.imageId": result.public_id,
				},
			},
			{ new: true }
		);

		return {
			error: null,
			statusCode: 200,
			data: user,
		};
	} catch (error) {
		return { error, statusCode: 500, data: null };
	}
};
