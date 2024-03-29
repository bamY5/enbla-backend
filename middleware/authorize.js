const User = require("../model/userModel");
const ErrorResponse = require("../util/errorResponse");
const jwt = require("jsonwebtoken");

exports.authorize = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.split(" ")[0] == "Bearer"
	) {
		token = req.headers.authorization.split(" ")[1];
	}
	if (!token) {
		return next(new ErrorResponse("Unauthorized route", 401));
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const usr = await User.findById(decoded.id);
		if (!usr) {
			return next(new ErrorResponse("Unauthorized route", 401));
		}
		req.user = usr;
	} catch (error) {
		return next(new ErrorResponse("Unauthorized route", 401));
	}

	next();
};
