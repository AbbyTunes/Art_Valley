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

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    likedArts: { 
      type: new GraphQLList(ArtType),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate("likedArts")
          .then(user => user.likedArts);
      }
    },
    publishedArts: {
      type: new GraphQLList(ArtType),
      resolve(parentValue) {
        return User.findById(parentValue.id)
        .populate("publishedArts")
        .then(user => user.publishedArts);
      }
    },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean }
  })
});

module.exports = UserType;
