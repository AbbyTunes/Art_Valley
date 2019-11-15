const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList
} = graphql;

const User = mongoose.model("users");
const Art = mongoose.model("arts");
const ArtType = require("./art_type");
const ArticleType = require("./article_type");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    location: { type: GraphQLString },
    bio: { type: GraphQLString },
    likedArts: {
			type: new GraphQLList(require("./art_type")),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate("likedArts")
          .then(user => user.likedArts);
      }
    },
    likedArticles: {
      type: new GraphQLList(require("./art_type")),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate("likedArticles")
          .then(user => user.likedArticles);
      }
    },
    publishedArts: {
			type: new GraphQLList(require("./art_type")),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate("publishedArts")
          .then(user => user.publishedArts);
      }
    },
    publishedComments: {
      type: new GraphQLList(require("./comment_type")),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate("publishedComments")
          .then(user => user.publishedComments);
      }
    },
    publishedArticles: {
      type: new GraphQLList(ArticleType),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate("publishedArticles")
          .then(user => user.publishedArticles);
      }
    },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean }
  })
});

module.exports = UserType;
