const mongoose = require("mongoose");
const path = require("path");

const MealThread = new mongoose.Schema({
	creator: {
		type: Object,
		required: true,
	},
	text: {
		type: String,
		maxlength: 150,
	},
	media: {
		type: [{ filepath: String, filename: String }],
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
});

MealThread.pre("save", function () {
	if (this.media) {
		for (var i = 0; i < this.media.length; i++) {
			let image = this.media[i].filename;
			let filename = `${i}${path.parse(image).ext}`;
			this.media[i] = { filepath: "", filename: filename };
		}
	}
});

module.exports = mongoose.model("MealModel", MealThread);
