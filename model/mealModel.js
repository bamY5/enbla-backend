const mongoose = require("mongoose");
const mongoose_fuzzy_search = require("mongoose-fuzzy-searching");
const { type } = require("os");

const MealThread = new mongoose.Schema({
	creator: {
		type: [mongoose.Schema.ObjectId],
		ref: "User",
		required: true,
	},
	event_id: {
		type: [mongoose.Schema.ObjectId],
		ref: "Liemat",
		required: true,
	},
	text: {
		type: String,
		maxlength: 150,
	},
	media: {
		type: [{ imageUrl: String, imageId: String }],
		maxlength: 6,
	},
	is_reply: {
		type: Boolean,
		default: false,
	},
	public_metrices: {
		replys: {
			type: [mongoose.Schema.ObjectId],
			ref: "MealThread",
			default: [],
		},
		reply_count: {
			type: Number,
			default: 0,
		},
		likes: {
			type: [mongoose.Schema.ObjectId],
			ref: "UserModel",
			default: [],
		},
		like_count: {
			type: Number,
			default: 0,
		},
	},
	removed: {
		type: Boolean,
		default: false,
	},
});

MealThread.plugin(mongoose_fuzzy_search, {
	fields: [{ name: "text", minSize: 3 }],
});

module.exports = mongoose.model("Meal", MealThread);
