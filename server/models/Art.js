const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const ArtSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 100
        },
        img: {
            data: Buffer,
            contentType: String,
            required: true
        },
        category: {
            type: String,
            required: ["photograph", "drawing", "painting"],
        },
        price: {
            type: Int,
            required: true
        },
        tag: {
            type: String
        },
        comments: [commentSchema]
    }
);

const Art = model('Art', ArtSchema);

module.exports = Art;