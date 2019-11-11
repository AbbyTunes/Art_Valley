const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = graphql;

// const UserType = require("./user_type");
const User = mongoose.model("users");
// const CategoryType = require("./category_type");
const Category = mongoose.model("categories");
const Art = mongoose.model("arts");

const ArtType = new GraphQLObjectType({
	name: "ArtType",
	fields: () => ({
		id: { type: GraphQLID },
		videoLink: { type: GraphQLString },
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
		likes: { type: GraphQLInt },
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
		}
	})
});

module.exports = ArtType;