const User = require("../model/userModel");
const ErrorResponse = require("../util/errorResponse");
const validateInput = require("../util/validateRegisterInput");
const userService = require("../util/userService/userService");
const { resolveSoa } = require("dns");

exports.signin = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password) {
		next(new ErrorResponse("Please enter username and password", 404));
	}

	var user = await User.findOne({ username }).select("+password");

	if (!user) {
		return next(new ErrorResponse("Invalid Credential", 401));
	}

	// Check if password matches
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new ErrorResponse(`Invalid Credential`, 401));
	} else {
		const token = await user.signWithJWT();
		res.json({
			success: true,
			token,
		});
	}
};

exports.register = async (req, res, next) => {
	data = req.body;
	const { errors, isValid } = validateInput(data);
	if (!isValid) {
		return next(new ErrorResponse(errors, 400));
	}

	obj = {
		name: data.name,
		username: data.username,
		phone: data.phone,
		password: data.password,
		email: data.email || "",
		bio: data.bio || "",
		birthday: data.birthday || "",
		profile_image: "",
		social_profile: {
			twitter: data.twitter || "",
			facebook: data.facebook || "",
			instagram: data.instagram || "",
		},
		public_metrics: {
			follower_count: 0,
			following_count: 0,
		},
	};

	// const user = await User.findOne({ username: data.username });

	const files = req.files;
	let profile;
	if (files) {
		obj.profile_image = files.profile.name;
		profile = files.profile;
	}

	const { error, response, statusCode } = await userService.registerUser(
		obj,
		profile
	);

	if (error) {
		return next(new ErrorResponse(response, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		token: response,
	});
};
