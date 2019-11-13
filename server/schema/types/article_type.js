const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID} = graphql;

const User = mongoose.model("users");
const Article = mongoose.model("articles");

const ArticleType = new GraphQLObjectType({
    name: "ArticleType",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        author: { 
            type: require("./user_type"),
            resolve(parentValue) {
                return User.findById(parentValue.author)
                .then(author => author)
                .catch(err => null);
            } 
        },
        photoLink: { type: GraphQLString },
        comments: {
            type: new GraphQLList(require("./comment_type")),
            resolve(parentValue) {
                return Article.findById(parentValue.id)
                    .populate("comments")
                    .then(article => article.comments)
            }
        },
        likers: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return Article.findById(parentValue.id)
                    .populate("likers")
                    .then(article => article.likers)
            }
        }
    })
});

module.exports = ArticleType;