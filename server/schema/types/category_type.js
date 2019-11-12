const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Category = mongoose.model("categories");

const CategoryType = new GraphQLObjectType({
	name: "CategoryType",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		arts: {
			type: new GraphQLList(require("./art_type")),
			resolve(parentValue) {
				return Category.findById(parentValue.id)
					.populate("arts")
					.then(category => category.arts)
			}
		}
	})
});

module.exports = CategoryType;