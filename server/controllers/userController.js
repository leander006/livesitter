const asyncHandler = require("express-async-handler");
const userService = require("../service/userService");
// register //

const registration = asyncHandler(async (req, res) => {
  try {
    const data = await userService.signup(req.body);
    return res
      .status(data.status)
      .json({ sucess: data.success, message: data.message });
  } catch (error) {
    return res
      .status(error.status)
      .json({ message: error.message, success: error.success });
  }
});

// login //

const login = asyncHandler(async (req, res) => {
  try {
    const data = await userService.getByEmail(req.body);
    return res.status(data.status).json({
      sucess: data.success,
      message: data.message,
      token: data.token,
      user: data.user,
    });
  } catch (error) {
    return res
      .status(error.status)
      .json({ message: error.message, success: error.success });
  }
});

module.exports = {
  registration,
  login,
};
