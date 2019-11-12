const mongoose = require("mongoose");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
const Schema = mongoose.Schema;

const ArtSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	category: {
		type: String,
		ref: "categories"
	},
	likers: [{
		type: Schema.Types.ObjectId,
		ref: "users"
	}],
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "comments"
	}],
	photoLink: {
		type: String
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	}
});

ArtSchema.pre("findByIdAndDelete", function() {
	const Art = mongoose.model("arts");
	const Category = mongoose.model("categories");

	Art.findById(this.getFilter())
		.then(art => {
			Category.findById(art.category)
				.then(category => {
					category.arts.pull(art);
					category.save();
				});
		});
});

module.exports = mongoose.model("arts", ArtSchema);