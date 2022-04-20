const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const body_parser = require("body-parser");
const ErrorHandler = require("./middleware/error");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
//config
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;

// connect db
const db = require("./config/db").connect();

// import routers
const liemat = require("./routes/liemat");
const meal = require("./routes/meal");
const user = require("./routes/user");
const auth = require("./routes/auth");

// mount
const app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

// Dev logging middleware
app.use(morgan("dev"));

// File upload
app.use(fileupload());

//Static Folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/liemat", liemat);
app.use("/api/v1/meal", meal);
app.use("/api/v1/user", user);
app.use("/api/v1/auth", auth);

// Error handler
app.use(ErrorHandler);

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT} !`);
});
