const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    artId: {
        type: Schema.Types.ObjectId,
        ref: "arts"
    }
});


module.exports = mongoose.model("comments", CommentSchema);