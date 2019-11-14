const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    art: {
        type: Schema.Types.ObjectId,
        ref: "arts"
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "articles"
    }
});


module.exports = mongoose.model("comments", CommentSchema);