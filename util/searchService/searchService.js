const UserModel = require("../../model/userModel");
const MealModel = require("../../model/mealModel");

exports.searchUser = async (keyword) => {
	try {
		const user = await UserModel.fuzzySearch({
			query: keyword,
			prefixOnly: true,
		}).exec();

		const meal = await MealModel.fuzzySearch({ query: keyword }).exec();

		const result = {};

		if (user) {
			result.people = { count: user.length, user };
		}
		if (meal) {
			result.meal = { count: meal.length, meal };
		}
		return {
			error: null,
			statusCode: 200,
			data: result,
		};
	} catch (error) {
		return { error, statusCode: 500, data: null };
	}
};
