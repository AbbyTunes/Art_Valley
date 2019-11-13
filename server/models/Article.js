const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
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
    }
});


module.exports = mongoose.model("articles", ArticleSchema);