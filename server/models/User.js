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
  location: {
    type: String

  },
  bio: {
    type: String
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

UserSchema.statics.addLikedArt = (userId, artId) => {
  const User = mongoose.model("users");
  const Art = mongoose.model("arts");

  return User.findById(userId).then(user => {
    return Art.findById(artId).then(art => {
      user.likedArts.push(art);
      art.likers.push(user);

      return Promise.all([user.save(), art.save()]).then(
        ([user, art]) => user
      );
    });
  });
};

UserSchema.statics.unlikeArt = (userId, artId) => {
	const User = mongoose.model("users");
	const Art = mongoose.model("arts");

	return User.findById(userId).then(user => {
		if (user.likedArts) {
			Art.findById(artId).then(art => {
				user.likedArts.pull(art);
				art.likers.pull(user);

				return Promise.all([user.save(), art.save()]).then(
					([user, art]) => user
				)
			})
		}
	})
}

UserSchema.statics.addLikedArticle = (userId, articleId) => {
  const User = mongoose.model("users");
  const Article = mongoose.model("articles");

  return User.findById(userId).then(user => {
    return Article.findById(articleId).then(article => {
      user.likedArticles.push(article);
      article.likers.push(user);


      return Promise.all([user.save(), article.save()]).then(
        ([user, article]) => user
      );
    });
  });
};

UserSchema.statics.unlikeArticle = (userId, articleId) => {
  const User = mongoose.model("users");
  const Article = mongoose.model("articles");

  return User.findById(userId).then(user => {
    if (user.likedArticles) {
      Article.findById(articleId).then(article => {
        user.likedArticles.pull(article);
        article.likers.pull(user);
  
        return Promise.all([user.save(), article.save()]).then(
          ([user, article]) => user
        )
      })
    }
  })
}

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

UserSchema.statics.addPublishedArticle = (userId, articlesId) => {
  const User = mongoose.model("users");
  const Article = mongoose.model("articles");

  return User.findById(userId).then(user => {
    return Article.findById(articlesId).then(articles => {
      user.publishedArticles.push(articles);

      return Promise.all([user.save(), articles.save()]).then(([user, articles]) => articles);
    });
  });
};

UserSchema.statics.deleteArticle = (userId, articleId) => {
  const User = mongoose.model("users");
  const Article = mongoose.model("articles");

  return User.findById(userId).then(user => {
    if (user.publishedArticles) {
      Article.findById(articleId).then(article => {
        user.publishedArticles.pull(article);

        return Promise.all([user.save(), article.save()]).then(
          ([user, article]) => user
        );
      });
    }
  });
};




module.exports = mongoose.model("users", UserSchema);
