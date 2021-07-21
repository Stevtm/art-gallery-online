const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const CommentSchema = new Schema({
	commentText: {
		type: String,
		required: "You need to enter a comment!",
		minlength: 1,
		maxlength: 240,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp),
	},
	// ref to user model?
	username: {
		type: String,
		required: true,
	},
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
