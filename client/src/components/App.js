import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import AuthRoute from "../util/route_util";
import Login from "./user_auth/Login";
import Register from "./user_auth/Register";
import Nav from "./nav/Nav";

import "./App.css";

const App = () => {
	return (
		<div>
			<Nav />
			<Switch>
        {/* debug buttons */}


        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
				{/* <Route exact path="/arts" component={Art} /> */}
				{/* <Route exact path="/cart" component={Cart} /> */}
			</Switch>

		</div>
	);
};

export default App;
