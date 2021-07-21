const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const ArtSchema = new Schema({
	// do we want a custom error message for the back-end? I'm assuming we'll manage errors in form submission on the front end
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
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
	// likes? User?
});

const Art = model("Art", ArtSchema);

module.exports = Art;
