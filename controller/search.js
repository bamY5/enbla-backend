const searchService = require("../util/searchService/searchService");
const ErrorResponse = require("../util/errorResponse");

exports.search = async (req, res, next) => {
	const { q } = req.query;
	const { error, statusCode, data } = await searchService.searchUser(q);

	if (error) {
		return next(new ErrorResponse(error, statusCode));
	}

	res.status(statusCode).json({
		success: true,
		data,
	});
};
