const User = require("../model/userModel");

exports.singleUser = async (id) => {
	const user = await User.findById(id);
	if (Object.keys(user).length !== 0) {
		const usr = {
			id: user.id,
			firstname: user.firstname,
			lastname: user.lastname,
			username: user.username,
			bio: user.bio,
			public_metrics: user.public_metrics,
			profile_img: user.profile_image,
			verified: user.verified,
			createdAt: user.createdAt,
		};
		return usr;
	}
	return user;
};
