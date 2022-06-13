const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const UserModel = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Please add a username"],
			unique: true,
		},
		firstname: {
			type: String,
			required: [true, "Please add firstname"],
		},
		lastname: {
			type: String,
			required: [true, "Please add lastname"],
		},
		phone: {
			type: String,
			required: true,
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
		},
		bio: {
			type: String,
			maxlength: 200,
		},
		profile_image: {
			imageUrl: String,
			imageId: String,
		},
		birthday: {
			type: String,
		},
		social_profile: {
			twitter: { type: String },
			facebook: { type: String },
			instagram: { type: String },
		},
		public_metrics: {
			follower: {
				type: [mongoose.Schema.ObjectId],
				ref: "UserModel",
				default: [],
			},
			follower_count: Number,
			following: {
				type: [mongoose.Schema.ObjectId],
				ref: "UserModel",
				default: [],
			},
			following_count: Number,
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
			name: "firstname",
			minSize: 2,
		},
		{
			name: "lastname",
			minSize: 2,
		},
		{ name: "username", minSize: 2 },
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
		{ id: this._id, username: this.username },
		process.env.JWT_SECRET
	);
};

// Password match
UserModel.methods.matchPassword = async function (enteredPassword) {
	const ret = await bcrypt.compare(enteredPassword, this.password);

	return ret;
};

module.exports = mongoose.model("User", UserModel);
