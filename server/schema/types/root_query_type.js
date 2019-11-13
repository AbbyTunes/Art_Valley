const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;

const UserType = require("./user_type");
const User = mongoose.model("users");
const ArtType = require("./art_type");
const Art = mongoose.model("arts");
const CategoryType = require("./category_type");
const Category = mongoose.model("categories");
const CommentType = require("./comment_type");
const Comment = mongoose.model("comments");
const ArticleType = require("./article_type");
const Article = mongoose.model("articles");

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
		categoryByName: {
			type: CategoryType,
			args: { name: { type: new GraphQLNonNull(GraphQLString) } },
			resolve(_, args) {
				return Category.find({ name: args.name })
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
		},
		artsByCategory: {
			type: new GraphQLList(ArtType), 
			args: { categoryId: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(_, args) {
				return Art.find({ category: args.categoryId });
			}
		},
		// artsByAuthor: {
		// 	type: new GraphQLList(ArtType),
		// 	args: { authorId: { type: new GraphQLNonNull(GraphQLID) } },
		// 	resolve(_, args) {
		// 		return Art.find({ author: args.authorId });
		// 	}
		// },
		comments: {
			type: new GraphQLList(CommentType),
			resolve() {
				return Comment.find({});
			}
		},
		comment: {
			type: CommentType,
			args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(_, args) {
				return Comment.findById(args._id);
			}
		},
	comments: {
		type: new GraphQLList(CommentType),
		resolve() {
			return Comment.find({});
		}
	},
	comment: {
		type: CommentType,
		args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
		resolve(_, args) {
			return Comment.findById(args._id);
		}
	},
	articles: {
		type: new GraphQLList(ArticleType),
		resolve() {
			return Article.find({});
		}
	},
	article: {
		type: ArticleType, 
		args: { _id: { type: new GraphQLNonNull(GraphQLID)}},
		resolve (_, args) {
			return Article.findById(args._id);
		}
	}
  })
});

module.exports = RootQueryType;
