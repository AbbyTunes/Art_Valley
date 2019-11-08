const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtSchema = new Schema({
	authorId: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	likers: [{
		type: Schema.Types.ObjectId,
		ref: "users"
	}],
	category: {
		type: Schema.Types.ObjectId,
		ref: "categories"
	},
	videoLink: {
		type: String
	},
	pictureLink: {
		type: String
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	likes: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model("arts", ArtSchema);