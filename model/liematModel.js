const mongoose = require("mongoose");

const LiematModel = new mongoose.Schema({
	creator: {
		type: [mongoose.Schema.ObjectId],
		ref: "User",
		required: true,
	},
	phoneNumber: { type: String, required: true },
	place: {
		type: String,
		maxlength: 50,
	},
	time: { type: String, required: true },
	joiners: {
		type: [mongoose.Schema.ObjectId],
		ref: "User",
	},
	joined: {
		type: Number,
		default: 0,
	},
	title: { type: String, required: true },
	description: {
		type: String,
		maxlength: 200,
	},
	closed: { type: Boolean, default: false },
	numberOfJoiners: { type: Number, required: true },
});

// update joined user number
LiematModel.pre("save", async function () {
	this.joiners = [this.creator.id];
	this.joined = this.joined + 1;
});

module.exports = mongoose.model("Liemat", LiematModel);
