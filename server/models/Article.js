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
    author: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    // art: {
    //     type: Schema.Types.ObjectId,
    //     ref: "arts"
    // },
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
});


module.exports = mongoose.model("articles", ArticleSchema);