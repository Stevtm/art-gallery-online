const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImgSchema = new Schema(
	{
		img: {
			data: Buffer,
			contentType: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Img", ImgSchema);
