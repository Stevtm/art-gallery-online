const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, "Must match an email address!"],
		},
		// I don't think we need the pw in the DB if we're using third-party auth
		password: {
			type: String,
			required: true,
			minlength: 8,
		},
		art: [
			{
				type: Schema.Types.ObjectId,
				ref: "Art",
			},
		],
		// do we want to include comments in here? Likes?
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
