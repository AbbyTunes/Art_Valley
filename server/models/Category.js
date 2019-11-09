const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	arts: [{
		type: Schema.Types.ObjectId,
		ref: "arts"
	}],
	name: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model("categories", CategorySchema);
