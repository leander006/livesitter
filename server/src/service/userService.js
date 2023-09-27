const User = require("../model/User");

const signup = async (data) => {
  const username = data.username;
  const email = data.email;
  const password = data.password;
  if (!username || !email || !password) {
    return res.status(401).json({ error: "Please enter all  field" });
  }

  const userExist = await User.findOne({ username: username });
  const emailExist = await User.findOne({ email: email });

  try {
    if (userExist) {
      throw {
        success: false,
        status: 400,
        message: "Username Exists",
        data: {},
      };
    } else if (emailExist) {
      throw {
        success: false,
        status: 401,
        message: "Email Exists",
        data: {},
      };
    }

    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });

    const user = await newUser.save();
    return {
      success: true,
      status: 201,
      message: "User registration done",
      data: user,
    };
  } catch (error) {
    throw {
      success: false,
      status: 505,
      message: error.message,
      data: {},
    };
  }
};

const getByEmail = async (data) => {
  try {
    const user = await User.findOne({ username: data.username });
    if (!user) {
      throw {
        success: false,
        message: "No user found",
        data: {},
      };
    }
    if (!user.comparePassword(data.password)) {
      throw {
        success: false,
        message: "Incorrect password",
        data: {},
      };
    }
    const token = user.genJWT();
    return {
      success: true,
      status: 200,
      message: "User successfully login",
      token,
      user,
    };
  } catch (error) {
    throw {
      success: false,
      status: 502,
      message: error.message,
      data: {},
    };
  }
};
module.exports = {
  signup,
  getByEmail,
};
