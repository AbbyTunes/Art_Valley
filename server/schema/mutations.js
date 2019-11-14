const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean
} = graphql;
const mongoose = require("mongoose");
const AuthService = require("../services/auth");

const User = mongoose.model("users");
const UserType = require("./types/user_type");
const Art = mongoose.model("arts");
const ArtType = require("./types/art_type");
const Category = mongoose.model("categories");
const CategoryType = require("./types/category_type");
const Comment = mongoose.model("comments");
const CommentType = require("./types/comment_type");
const Article = mongoose.model("articles");
const ArticleType = require("./types/article_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newCategory: {
      type: CategoryType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(_, args) {
        return new Category(args).save();
      }
    },
    newArt: {
      type: ArtType,
      args: {
        category: { type: GraphQLID },
        author: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        photoLink: { type: GraphQLString }
      },
      errors: [
        {
          state: {
            title: ["There is already an art piece with this title"]
          }
        }
      ],
      async resolve(_, args, context) {
        return new Art(args).save().then(art => {
          if (art.category) {
            console.log(art);
            return Category.findById(args.category).then(category => {
              category.arts.push(art);
							return category.save()
							.then(category => art);
						})
						.then(art => {
							User.addPublishedArt(art.author, art.id)
							return (art => art)
						})
          } else {
            return art;
          }
				})
        // const validUser = await AuthService.verifyUser({ token: context.token });
        // if (validUser.loggedIn) {

        // } else {
        // 	throw new Error("sorry, you need to log in first");
        // }
      }
    },
    deleteArt: {
      type: ArtType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, { _id }) {
        return Art.findByIdAndDelete({ _id })
          .then(art => art)
          .catch(err => null);
      }
    },
    deleteComment: {
      type: CommentType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, { _id }) {
        return Comment.findByIdAndDelete({ _id })
          .then(comment => comment)
          .catch(err => null);
      }
    },
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    addUserLikedArt: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        artId: { type: GraphQLID }
      },
      resolve(_, { userId, artId }) {
        return User.addLikedArt(userId, artId);
      }
    },
    addUserLikedArticle: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        articleId: { type: GraphQLID }
      },
      resolve(_, { userId, articleId }) {
        debugger;
        return User.addLikedArticle(userId, articleId);
      }
    },
    addUserPublishedArt: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        artId: { type: GraphQLID }
      },
      resolve(_, { userId, artId }) {
        return User.addPublishedArt(userId, artId);
      }
    },
    // newComment: {
    //   type: CommentType,
    //   args: {
    //     body: { type: GraphQLString },
    //     author: { type: GraphQLID },
    //     art: { type: GraphQLID },
    //     article: { type: GraphQLID }
    //   },
    //   async resolve(_, args) {
    //     return new Comment(args).save().then(comment => {
    //       return User.findById(comment.author)
    //         .then(user => {
    //           user.publishedComments.push(comment);
    //           user.save();
    //           return comment;
    //         })
    //         .then(comment => {
    //           let model = comment.article ? Article : Art;
    //           let id_ref = comment.article ? article : art;
    //           debugger;
    //           // let model_ref = comment.article ? article : art;
    //           return model.findById(id_ref).then(response => {
    //             console.log(response);
    //             response.comments.push(comment._id);
    //             response.save();
    //             return comment;
    //           });
    //         })
    //         .catch(err => console.log(err));
    //     });
    //   }
    // },
    newComment: {
      type: CommentType,
      args: {
        body: { type: GraphQLString },
        author: { type: GraphQLID },
        art: { type: GraphQLID },
        article: { type: GraphQLID }
      },
      async resolve(_, args) {
        return new Comment(args).save().then(comment => {
          return User.findById(comment.author)
            .then(user => {
              user.publishedComments.push(comment);
              user.save();
              return comment;
            })
            .then(comment => {
              return Art.findById(comment.art).then(art => {
                console.log(art);
                art.comments.push(comment._id);
                art.save();
                return comment;
              });
            })
            .catch(err => console.log(err));
        });
      }
    },
    newArticle: {
      type: ArticleType,
      args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        header: { type: GraphQLString },
        author: { type: GraphQLID },
        photoLink: { type: GraphQLString }
      },
      async resolve(_, args) {
        return new Article(args).save().then(article => {
          return User.findById(article.author)
            .then(user => {
              user.publishedArticles.push(article);
              user.save();
              return article;
            })
            .catch(err => console.log(err));
        });
      }
    }
    // uploadImage: {
    // 	type: GraphQLBoolean,
    // 	args: {
    // 		file: {
    // 			type: GraphQLUpload
    // 		}
    // 	},
    // 	async resolve(parent,args) {
    // 		const file = await args.file
    // 		const {
    // 			createReadStream,
    // 			filename,
    // 			mimetype
    // 		} = file
    // 		const fileStream = createReadStream()
    // 		const uploadParams = {
    // 			Bucket: art-valley-dev,
    // 			Key: filename,
    // 			Body: fileStream,
    // 		}
    // 	}
    // }
  }
});

module.exports = mutation;
