const mongoose = require("mongoose");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
const Schema = mongoose.Schema;

const ArtSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	likers: [{
		type: Schema.Types.ObjectId,
		ref: "users"
	}],
	category: {
		type: String,
		ref: "categories"
	},
	videoLink: {
		type: String
	},
	photoLink: {
		type: String
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "comments"
<<<<<<< HEAD
	}]
=======
	}],
	s3_key: { type: String }
>>>>>>> 5ed009f3943be788dede5875a7eb030411dfdb4e
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