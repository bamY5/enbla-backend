const UserModel = require("../../model/userModel");
const fs = require("fs");
const path = require("path");

exports.registerUser = async (obj, profile = null) => {
	if (await UserModel.findOne({ username: obj.username })) {
		return {
			errror: true,
			statusCode: 400,
			response: "User alreadly exist",
		};
	}

	const user = await UserModel.create(obj);

	if (profile) {
		const dir = fs.mkdirSync(
			`${process.env.FILE_UPLOAD_PATH}/${user.username}/profile`,
			{ recursive: true }
		);
		console.log(dir);

		await profile.mv(`${dir}/profile/${user.profile_image}`, async (err) => {
			if (err) {
				await UserModel.findByIdAndDelete(user.id);
				return {
					error: true,
					statusCode: 500,
					response: "Server side problem",
				};
			}
		});
	}
	const token = user.signWithJWT();

	return {
		error: false,
		statusCode: 200,
		response: token,
	};
};
