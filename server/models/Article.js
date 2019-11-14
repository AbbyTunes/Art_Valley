const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    photoLink: {
        type: String
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comments"
    }],
    likers: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    s3_key: { type: String }
});


module.exports = mongoose.model("articles", ArticleSchema);