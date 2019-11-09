const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const User = mongoose.model("users");
const ArtType = require("./art_type");
const Art = mongoose.model("arts");
const CategoryType = require("./category_type");
const Category = mongoose.model("categories");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
		},
		categories: {
			type: new GraphQLList(CategoryType),
			resolve() {
				return Category.find({});
			}
		},
		category: {
			type: CategoryType,
			args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(_, args) {
				return Category.findById(args._id)
			}
		},
		arts: {
			type: new GraphQLList(ArtType),
			resolve() {
				return Art.find({});
			}
		},
		artById: {
			type: ArtType,
			args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(_, args) {
				return Art.findById(args._id);
			}
		}
		
		// artByAuthor: {
		// 	type: ArtType,
		// 	args: { authorId: { type: new GraphQLNonNull(GraphQLID) } },
		// 	resolve(_, args) {
		// 		return Art.find({ authorId: args.authorId });
		// 	}
		// },
		// artByCategory: {
		// 	type: ArtType,
		// 	args: { category: { type: new GraphQLNonNull(GraphQLID) } },
		// 	resolve(_, args) {
		// 		return Art.find({ category: args.category });
		// 	}
		// }
  })
});

module.exports = RootQueryType;
