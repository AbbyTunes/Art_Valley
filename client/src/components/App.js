import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";

import Login from "./user_auth/Login";
import Register from "./user_auth/Register";
import Nav from "./nav/Nav";
import Profile from "./user/Profile"
import Settings from "./user/Settings";
import CreateArt from "./art/CreateArt";
import ArtIndex from "./art/art_index";
import ArtShow from "./art/art_show";
import ArticleCreate from './articles/ArticleCreate';
import ArticleIndex from './articles/ArticleIndex';
import ArticleShow from './articles/ArticleShow';
import VideoIndex from "./art/video_index";
import VideoShow from "./art/video_show";

import "./App.css";

const App = () => {
	return (
		<div>
			<Nav />
			<Switch>
				<AuthRoute exact path="/login" component={Login} routeType="auth" />
				<AuthRoute exact path="/register" component={Register} routeType="auth" />
				<Route exact path="/arts" component={ArtIndex} />
				<Route exact path="/arts/:artId" component={ArtShow} />

				<Route exact path="/community/create" component={ArticleCreate} />
				<Route exact path="/community/:articleId" component={ArticleShow} />
				<Route exact path="/community" component={ArticleIndex} />
				<Route exact path="/videos" component={VideoIndex} />
				<Route exact path="/videos/:artId" component={VideoShow} />
			</Switch>
			<Route exact path="/create" component={CreateArt}/>
			
			<Route exact path="/users/:userId" component={Profile} />
			<Route exact path="/settings/:userId" component={Settings} />
		</div>
	);
};

export default App;
