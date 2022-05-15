const User = require("../../model/userModel");
const fs = require("fs");
const path = require("path");
const { singleUser } = require("../singleUser");
const { upload, deleteImage } = require("../fileUpload");

exports.signIn = async (obj) => {
	try {
		var user = await User.findOne({ username: obj.username }).select(
			"+password"
		);
		if (!user) {
			return {
				error: "User does not exist",
				statusCode: 400,
				data: null,
			};
		}

		// Check if password matches
		const isMatch = await user.matchPassword(obj.password);

		if (!isMatch) {
			return {
				error: `Invalid Credential`,
				statusCode: 401,
				data: null,
			};
		} else {
			const token = await user.signWithJWT();
			return {
				error: null,
				statusCode: 200,
				data: token,
			};
		}
	} catch (error) {
		return {
			error,
			statusCode: 400,
			data: null,
		};
	}
};

exports.registerUser = async (obj, media) => {
	try {
		if (await User.findOne({ username: obj.username })) {
			return {
				error: "User alreadly exist",
				statusCode: 400,
				data: null,
			};
		}
		if (media) {
			const { error, result } = await upload(media.profile, "profile");
			if (error) {
				console.log(error);
				return {
					err: error.message,
					statusCode: 500,
					data: null,
				};
			}
			obj.profile_image = {
				imageUrl: result.secure_url,
				imageId: result.public_id,
			};
		}

		let user = await User.create(obj);

		user = await singleUser(user.id);
		return {
			error: null,
			statusCode: 200,
			data: user,
		};
	} catch (error) {
		console.log(error);
		return {
			error,
			statusCode: 400,
			data: null,
		};
	}
};
