const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 32
	},
  date: {
    type: Date,
    default: Date.now
  },
  likedArts: [{
    type: Schema.Types.ObjectId,
    ref: "arts" 
  }],
  likedArticles: [{
    type: Schema.Types.ObjectId,
    ref: "articles"
  }],
  publishedArts: [{
    type: Schema.Types.ObjectId,
    ref: "arts"
  }],
  publishedComments: [{
    type: Schema.Types.ObjectId,
    ref: "comments"
  }],
  publishedArticles: [{
    type: Schema.Types.ObjectId,
    ref: "articles"
  }],
  // ,
  // playlist: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "videos" 
  // }]
});


UserSchema.statics.addLikedArt = (userId, artId ) => {
  const User = mongoose.model("users");
  const Art = mongoose.model("arts");

  return User.findById(userId).then(user => {
    return Art.findById(artId).then(art => {
      user.likedArts.push(art);
      art.likers.push(user);
      art.likes += 1;

      return Promise.all([user.save(), art.save()]).then(
        ([user, art]) => art
      );
    });
  });
};

UserSchema.statics.addLikedArticle = (userId, articleId) => {
  const User = mongoose.model("users");
  const Article = mongoose.model("article");

  return User.findById(userId).then(user => {
    return Article.findById(articleId).then(article => {
      user.likedArticles.push(article);
      article.likers.push(user);

      return Promise.all([user.save(), article.save()]).then(
        ([user, article]) => article
      );
    });
  });
};

UserSchema.statics.addPublishedArt = (userId, artId) => {
  const User = mongoose.model("users");
  const Art = mongoose.model("arts");

  return User.findById(userId).then(user => {
    return Art.findById(artId).then(art => {
      user.publishedArts.push(art);

      return Promise.all([user.save(), art.save()]).then(
        ([user, art]) => art
      );
    });
  });
};



module.exports = mongoose.model("users", UserSchema);
