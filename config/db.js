const mongoose = require("mongoose");

exports.connect = () => {
	mongoose
		.connect(process.env.MONGO_URI || "mongoose://localhost:27017/EnblaDB", {
			keepAlive: 1,
		})
		.then(() => {
			console.log("Database connected");
		});
};
