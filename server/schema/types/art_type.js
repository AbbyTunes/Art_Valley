const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const Art = mongoose.model("arts");
const User = mongoose.model("users");
const Category = mongoose.model("categories");
const Comment = mongoose.model("comments");

const ArtType = new GraphQLObjectType({
	name: "ArtType",
	fields: () => ({
		id: { type: GraphQLID },
		photoLink: { type: GraphQLString },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		author: {
			type: require("./user_type"),
			resolve(parentValue) {
				return User.findById(parentValue.author)
					.then(author => author)
					.catch(err => null);
			}
		},
		likers: {
			type: new GraphQLList(require("./user_type")),
			resolve(parentValue) {
				return Art.findById(parentValue.id)
					.populate("likers")
					.then(art => art.likers)
			}
		},
		category: {
			type: require("./category_type"),
			resolve(parentValue) {
				return Category.findById(parentValue.category)
					.then(category => category)
					.catch(err => null);
			}
		},
		comments: {
			type: new GraphQLList(require("./comment_type")),
			resolve(parentValue) {
				return Art.findById(parentValue.id)
					.populate("comments")
					.then(art => art.comments)
			}
		}
	})
});

module.exports = ArtType;