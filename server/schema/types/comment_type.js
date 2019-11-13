const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID} = graphql;

const User = mongoose.model("users");
const Art = mongoose.model("arts");

const CommentType = new GraphQLObjectType({
    name: "CommentType",
    fields: () => ({
        id: { type: GraphQLID },
        body: { type: GraphQLString },
        author: { 
            type: require("./user_type"),
            resolve(parentValue) {
                return User.findById(parentValue.author)
                .then(author => author)
                .catch(err => null);
            } 
        },
        art: { 
            type: require("./art_type"),
            resolve(parentValue) {
                return Art.findById(parentValue.art)
                    .then(art => art)
                    .catch(err => null);
            }
        },
        article: {
            type: require("./article_type"),
            resolve(parentValue) {
                return Article.findById(parentValue.article)
                    .then(art => article)
                    .catch(err => null);
            }
        }
    })
});

module.exports = CommentType;