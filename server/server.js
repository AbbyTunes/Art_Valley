const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = process.env.MONGO_URI || require("../config/keys").MONGO_URI;
const expressGraphQL = require("express-graphql");
require("./models/index");
const schema = require("./schema/schema");
const cors = require("cors");

const fileUpload = require("./routes/fileUpload");
const articleUpload = require("./routes/articleUpload");

const app = express();

if (!db) {
	throw new Error("You must provide a string to connect to MongoDB Atlas");
}

app.use(cors());

app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    };
  })
);

app.use("/api/art", fileUpload);

app.use("/api/article", articleUpload);

mongoose
	.connect(db, {
		useNewUrlParser: true, useUnifiedTopology: true
	})
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch(err => console.log(err));

app.use(bodyParser.json());

module.exports = app;
