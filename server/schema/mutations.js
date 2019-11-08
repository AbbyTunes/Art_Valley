const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
	GraphQLBoolean
} = graphql;
const mongoose = require("mongoose");
const AuthService = require("../services/auth");
const UserType = require("./types/user_type");
// const CategoryType = require("./types/category_type");

const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		// newCategory: {
		// 	type: CategoryType,
		// 	args: {
		// 		name: { type: new GraphQLNonNull(GraphQLString) }
		// 	},
		// 	resolve(_, { name }) {
		// 		return new Category({ name }).save();
		// 	}
		// },
		// deleteCategory: {
		// 	type: CategoryType,
		// 	args: {
		// 		_id: { type: new GraphQLNonNull(GraphQLID) }
		// 	},
		// 	resolve(_, { _id }) {
		// 		return Category.findByIdAndDelete(_id)
		// 			.then(category => category)
		// 			.catch(err => null);
		// 	}
		// },
		// newProduct: {
		// 	type: ProductType,
		// 	args: {
		// 		name: { type: new GraphQLNonNull(GraphQLString) },
		// 		description: { type: new GraphQLNonNull(GraphQLString) },
		// 		weight: { type: new GraphQLNonNull(GraphQLFloat) },
		// 		cost: { type: GraphQLInt }
		// 	},
		// 	async resolve(_, { name, description, weight }, context) {
		// 		const validUser = await AuthService.verifyUser({ token: context.token });

		// 		if (validUser.loggedIn) {
		// 			const cost = function getRandomInt(max) {
		// 				return Math.floor(Math.random() * Math.floor(max));
		// 			}(100);

		// 			new Product({ name, description, weight, cost }).save();
		// 		} else {
		// 			throw new Error("sorry, you need to log in first");
		// 		}

		// 	}
		// },
		// deleteProduct: {
		// 	type: ProductType,
		// 	args: {
		// 		_id: { type: new GraphQLNonNull(GraphQLID) }
		// 	},
		// 	resolve(_, { _id }) {
		// 		return Product.findByIdAndDelete(_id)
		// 			.then(product => product)
		// 			.catch(err => null);
		// 	}
		// },
		// updateProductCategory: {
		// 	type: ProductType,
		// 	args: {
		// 		productId: { type: new GraphQLNonNull(GraphQLID) },
		// 		categoryId: { type: new GraphQLNonNull(GraphQLID) }
		// 	},
		// 	resolve(_, { productId, categoryId }) {
		// 		return Product.updateProductCategory(productId, categoryId)
		// 			.then(product => product)
		// 			.catch(err => err);
		// 	}
		// },
		register: {
			type: UserType,
			args: {
				name: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(_, args) {
				return AuthService.register(args);
			}
		},
		logout: {
			type: UserType,
			args: {
				_id: { type: GraphQLID }
			},
			resolve(_, args) {
				return AuthService.logout(args);
			}
		},
		login: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(_, args) {
				return AuthService.login(args);
			}
		},
		verifyUser: {
			type: UserType,
			args: {
				token: { type: GraphQLString }
			},
			resolve(_, args) {
				return AuthService.verifyUser(args);
			}
		}
	}
});

module.exports = mutation;
