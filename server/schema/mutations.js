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

				const validUser = await AuthService.verifyUser({ token: context.token });
				if (validUser.loggedIn) {

					return null
					} else {
					throw new Error("sorry, you need to log in first");
				}
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
    deleteArticle: {
      type: ArticleType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, { _id }) {
        return Article.findByIdAndDelete({ _id })
          .then(article => article)
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
    userUnlikeArt: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        artId: { type: GraphQLID }
      },
      resolve(_, { userId, artId }) {
        return User.unlikeArt(userId, artId);
      }
    },
    
    addUserLikedArticle: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        articleId: { type: GraphQLID }
      },
      resolve(_, { userId, articleId }) {
        return User.addLikedArticle(userId, articleId);
      }
    },
    userUnlikeArticle: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        articleId: { type: GraphQLID }
      },
      resolve(_, { userId, articleId }) {
        return User.unlikeArticle(userId, articleId);
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
    editSettings: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        location: { type: GraphQLString },
        bio: { type: GraphQLString }
      },
      resolve(parentValue, { id, name, email, location, bio }) {
        const updateObj = {};

        if (id) updateObj.id = id;
        if (name) updateObj.name = name;
        if (email) updateObj.email = email;
        if (location) updateObj.location = location;
        if (bio) updateObj.bio = bio;
        console.log(updateObj);
        return User.findOneAndUpdate(
          { id: id },
          { $set: updateObj },
          { new: true },
          (err, user) => {
            console.log(user);
            return user;
          }
        );
      }
    },
    updateArticle: {
      type: ArticleType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        header: { type: GraphQLString },
        body: { type: GraphQLString }
      },
      resolve(parentValue, { id, title, header, body }) {
        const updateObj = {};
        if (title) updateObj.title = title;
        if (header) updateObj.header = header;
        if (body) updateObj.body = body;

        return Article.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true },
          (err, article) => {
            return article;
          }
        );
      }
    },
    updateArt: {
      type: ArtType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parentValue, { id, title, description }) {
        const updateObj = {};
        if (title) updateObj.title = title;
        if (description) updateObj.description = description;

        return Art.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true },
          (err, art) => {
            return art;
          }
        );
      }
    },
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
              if (comment.article) {
                return Article.findById(comment.article).then(article => {
                  console.log(article);
                  article.comments.push(comment._id);
                  article.save();
                  return comment;
                });
              } else {
                return Art.findById(comment.art).then(art => {
                  console.log(art);
                  art.comments.push(comment._id);
                  art.save();
                  return comment;
                });
              }
            })
            .catch(err => console.log(err));
        });
      }
    }
    // newArticle: {
    //   type: ArticleType,
    //   args: {
    //     title: { type: GraphQLString },
    //     body: { type: GraphQLString },
    //     header: { type: GraphQLString },
    //     author: { type: GraphQLID },
    //     photoLink: { type: GraphQLString }
    //   },
    //   async resolve(_, args) {
    //     return new Article(args).save().then(article => {
    //       return User.findById(article.author)
    //         .then(user => {
    //           user.publishedArticles.push(article);
    //           user.save();
    //           return article;
    //         })
    //         .catch(err => console.log(err));
    //     });
    //   }
    // }
  }
});

module.exports = mutation;
