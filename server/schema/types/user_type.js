const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    // likedArts: { type: GraphQLList},
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean }
  })
});

module.exports = UserType;
