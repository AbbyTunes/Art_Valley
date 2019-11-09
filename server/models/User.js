const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 32
	},
  date: {
    type: Date,
    default: Date.now
  }
  ,
  likedArts: [{
    type: Schema.Types.ObjectId,
    ref: "arts" 
  }]
  // ,
  // playlist: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "videos" 
  // }]
});


UserSchema.statics.addLikedArt = (userId, artId ) => {
  const User = mongoose.model("users");
  const Art = mongoose.model("arts");

  return User.findById(userId).then(user => {
    return Art.findById(artId).then(art => {
      user.likedArts.push(art);
      art.likers.push(user);
      art.likes += 1;

      return Promise.all([user.save(), art.save()]).then(
        ([user, art]) => art
      );
    });
  });
};

module.exports = mongoose.model("users", UserSchema);
