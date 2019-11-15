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
	}],
	s3_key: { type: String }
});

//more commment 

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
		})
	// need to pull the art from User's likedArt and publishedArt array
});

ArtSchema.statics.addCategory = (categoryId, artId) => {
  const Category = mongoose.model("categories");
  const Art = mongoose.model("arts");

  return Category.findById(categoryId).then(category => {
    return Art.findById(artId).then(art => {
      category.arts.push(art);

      return Promise.all([category.save(), art.save()]).then(
        ([category, art]) => art
      );
    });
  });
};

module.exports = mongoose.model("arts", ArtSchema);