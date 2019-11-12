const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = process.env.MONGO_URI || require("../config/keys").MONGO_URI;
const expressGraphQL = require("express-graphql");
require("./models/index");
const schema = require("./schema/schema");
const cors = require("cors");
// import { graphqlUploadExpress } from "graphql-upload";

const app = express();

if (!db) {
	throw new Error("You must provide a string to connect to MongoDB Atlas");
}

app.use(cors());

app.use(
  "/graphql",
//   graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
        // currentUserId: req.headers.currentUserId
      },
      graphiql: true
    };
  })
);

mongoose
	.connect(db, {
		useNewUrlParser: true, useUnifiedTopology: true
	})
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch(err => console.log(err));

app.use(bodyParser.json());

module.exports = app;
