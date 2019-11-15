import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { persistCache } from 'apollo-cache-persist';
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { HashRouter } from "react-router-dom";
// const models = require('../models/index');
// const schema = require('./schema/schema');

import Mutations from "./graphql/mutations";
const { VERIFY_USER } = Mutations;

let uri;
if (process.env.NODE_ENV === "production") {
	uri = `/graphql`;
} else {
	uri = "http://localhost:5000/graphql";
}

const httpLink = createHttpLink({
	uri,
	headers: {
		authorization: localStorage.getItem("auth-token") || ""
		// currentUserId: localStorage.getItem("currentUserId")
	}
});

const errorLink = onError(({ graphQLErrors }) => {
	if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const cache = new InMemoryCache({
	dataIdFromObject: object => object._id || null
});

// persistCache({
// 	cache,
// 	storage: localStorage
// });

console.dir(localStorage);

const client = new ApolloClient({
	link: ApolloLink.from([errorLink, httpLink]),
	cache,
	connectToDevTools: true,
	resolvers: {},
	onError: ({ networkError, graphQLErrors }) => {
		console.log("graphQLErrors", graphQLErrors);
		console.log("networkError", networkError);
	}
});

const token = localStorage.getItem("auth-token");
// const currentUserId = localStorage.getItem("currentUserId");

cache.writeData({
	data: {
		isLoggedIn: Boolean(token),
		isCurrentUser: Boolean(localStorage.getItem("currentUserId"))
	}
});

if (token) {
	client
		.mutate({ mutation: VERIFY_USER, variables: { token } })
		.then(({ data }) => {
			console.log(data)
			debugger
			cache.writeData({
				data: {
					isLoggedIn: data.verifyUser.loggedIn,
					isCurrentUser: data.verifyUser.isCurrentUser
				}
			});
		});
} else {
	cache.writeData({
		data: {
			isLoggedIn: false,
			isCurrentUser: null
		}
	});
}

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<HashRouter>
				<App />
			</HashRouter>
		</ApolloProvider>
	);
};

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();
