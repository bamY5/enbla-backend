const cloudinary = require("../config/cloudinaryConfig");
const path = require("path");
const DatauriParser = require("datauri/parser");
const { options } = require("../routes/liemat");
const parser = new DatauriParser();

exports.upload = async (image, folder) => {
	try {
		const extName = path.extname(image.name).toString();
		const file64 = parser.format(extName, image.data);

		const result = await cloudinary.uploader.upload(file64.content, {
			folder: `${process.env.CLOUDINARY_BASE_FOLDER}/${folder}`,
		});

		return {
			error: null,
			result,
		};
	} catch (error) {
		return { error: error.message, result: null };
	}
};

exports.deleteImage = async (asset_id) => {
	try {
		await cloudinary.uploader.destroy(asset_id);
		return {
			error: null,
			result: "Deleted Successfully",
		};
	} catch (error) {
		return { error: error.message, result: null };
	}
};
