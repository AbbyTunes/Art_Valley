const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = process.env.secretOrKey || require("../../config/keys").secretOrKey;

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("This user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(
      {
        name,
        email,
        password: hashedPassword
      },
      err => {
        if (err) throw err;
      }
    );

    user.save();
    let newUser = user;
    const token = jwt.sign({ id: user._id }, keys);
    return { token, id: newUser._id, username: newUser.name, loggedIn: true, ...newUser._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const logout = async ({ id }) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("this user doesn't exist, logout failed");
  }

  const token = "";
  const userId = "";
  const userName = "";

  return { token, userId, userName, loggedIn: false, ...user._doc, password: null };
};

const login = async data => {
  try {
    // use our other validator we wrote to validate this data
    const { message, isValid } = validateLoginInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { email, password } = data;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Username/Password is wrong");
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user._id }, keys);
			return { token, id: user._id, loggedIn: true,...user._doc, password: null };
			
    } else {
      throw new Error("Username/Password is wrong");
    }
  } catch (err) {
    throw err;
  }
};

const verifyUser = async data => {
  try {
    // we take in the token from our mutation
    const { token } = data;
    // we decode the token using our secret password to get the
    // user's id
    const decoded = jwt.verify(token, keys);
    const { id } = decoded;

    // then we try to use the User with the id we just decoded
    // making sure we await the response
    const loggedIn = await User.findById(id).then(user => {
      return user ? true : false;
		});
    return { loggedIn, id };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = { register, logout, login, verifyUser };
