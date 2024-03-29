const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const UserModel = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: [true, "Please add a full name"],
		},
		phone: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
			minlength: 6,
			select: false,
		},
		resetPasswordToken: { type: String, select: false },
		resetPasswordExpire: { type: Date, select: false },
		email: {
			type: String,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?)*(\.\w{2,3})+$/,
				"Please add a valid email",
			],
			default: "",
		},
		bio: {
			type: String,
			maxlength: 200,
			default: "",
		},
		profile_image: {
			imageUrl: { type: String, default: "" },
			imageId: { type: String, default: "" },
		},
		birthday: {
			type: String,
		},
		social_profile: {
			twitter: { type: String, default: "" },
			facebook: { type: String, default: "" },
			instagram: { type: String, default: "" },
		},
		public_metrics: {
			follower: {
				type: [mongoose.Schema.ObjectId],
				ref: "UserModel",
				default: [],
			},
			follower_count: { type: Number, default: 0 },
			following: {
				type: [mongoose.Schema.ObjectId],
				ref: "UserModel",
				default: [],
			},
			following_count: { type: Number, default: 0 },
		},
		verified: {
			type: Boolean,
			default: false,
			select: false,
		},
	},
	{ timestamps: { created_at: "created_at", modified_at: "modified_at" } }
);

UserModel.plugin(mongoose_fuzzy_searching, {
	fields: [
		{
			fullName: "fullname",
			minSize: 2,
		},
	],
	middlewares: {
		preSave: async function () {
			// Encrypt password using bcrypt
			const salt = await bcrypt.genSalt(10);
			this.password = await bcrypt.hash(this.password, salt);
		},
	},
});

// JWT token generate
UserModel.methods.signWithJWT = function () {
	return jwt.sign(
		{
			id: this._id,
			fullName: this.fullName,
			phone: this.phone,
			profile_image: this.profile_image,
		},
		process.env.JWT_SECRET
	);
};

// Password match
UserModel.methods.matchPassword = async function (enteredPassword) {
	const ret = await bcrypt.compare(enteredPassword, this.password);

	return ret;
};

module.exports = mongoose.model("User", UserModel);
