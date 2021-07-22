const { Schema, model } = require("mongoose");

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
		},
		art: [
			{
				type: Schema.Types.ObjectId,
				ref: "Art",
			},
		],
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// userSchema.pre("save", async function (next) {
// 	if (this.isNew || this.isModified("password")) {
// 		const saltRounds = 10;
// 		this.password = await bcrypt.hash(this.password, saltRounds);
// 	}

// 	next();
// });

// userSchema.methods.isCorrectPassword = async function (password) {
// 	return bcrypt.compare(password, this.password);
// };

const User = model("User", userSchema);

module.exports = User;
