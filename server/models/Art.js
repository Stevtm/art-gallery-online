const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const artSchema = new Schema({
	title: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 100,
	},
	description: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 100,
	},
	img: {
		data: Buffer,
		contentType: String,
	},
	category: {
		type: String,
		required: ["photograph", "drawing", "painting"],
	},
	price: {
		type: Number,
		required: true,
	},
	tag: [
		{
			type: String,
		},
	],
	likes: [
		{
			type: Schema.Types.ObjectId,
			ref: "Like",
		},
	],
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

const Art = model("Art", artSchema);

module.exports = Art;
