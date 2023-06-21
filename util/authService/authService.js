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

exports.registerUser = async (obj) => {
	try {
		if (await User.findOne({ username: obj.username })) {
			return {
				error: "User already exist",
				statusCode: 400,
				data: null,
			};
		}
		let user = await User.create(obj);

		return {
			error: null,
			statusCode: 200,
			data: "User Successfully Registered!",
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
